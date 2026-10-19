# ADR-003: Cơ Chế Chống Lặp Giao Dịch Thanh Toán (Payment Idempotency Engine)

> **Trạng thái**: Đã chấp thuận (Accepted)  
> **Ngày quyết định**: 2026-10-19  
> **Căn cứ**: Đề bài Assignment 2 – Mục 4.1.4 (ADR-005) & Mục 6.1.3 (Task 5.1 & Task 10)

---

## 1. Bối cảnh và Đặt vấn đề

Trong môi trường mạng di động, khách hàng thường gặp sự cố kết nối chập chờn khi thực hiện thanh toán. Nếu hệ thống phản hồi chậm hoặc ứng dụng tự động gửi lại yêu cầu (retry), có rủi ro nghiêm trọng là đơn hàng bị thanh toán hai lần hoặc người dùng bị trừ tiền hai lần cho cùng một giao dịch logic.

## 2. Quyết định (Decision)

Áp dụng cơ chế **Idempotency** bền vững tại `PaymentsModule`:
1. Client tạo một mã ngẫu nhiên duy nhất `Idempotency-Key` (chuẩn UUID v4) cho mỗi phiên thanh toán logic và gửi kèm trong Header của request `POST /payments`.
2. Khi nhận request, backend tính chuỗi băm an toàn `payloadHash = sha256(orderId + method + amount)`.
3. Kiểm tra bản ghi trong bảng `Payment`:
   - **Trường hợp 1 (Key mới)**: Tạo bản ghi `Payment` với trạng thái `PROCESSING`, lưu `idempotencyKey` và `payloadHash`. Tiến hành gọi Mock Payment Gateway.
   - **Trường hợp 2 (Cùng Key + Cùng Payload)**: Trả về ngay kết quả giao dịch đã lưu trước đó (`SUCCEEDED`, `FAILED` hoặc `PROCESSING`) mà không gọi lại Gateway và không cộng điểm lần hai.
   - **Trường hợp 3 (Cùng Key + Khác Payload)**: Từ chối xử lý và trả về mã lỗi HTTP `409 Conflict` (`IDEMPOTENCY_KEY_REUSED_WITH_DIFFERENT_PAYLOAD`).
4. **Quy tắc cô lập kết nối**: Tuyệt đối không giữ mở Database Transaction trong suốt quá trình gọi mạng sang Mock Gateway để phòng ngừa hiện tượng cạn kiệt Connection Pool khi Gateway bị chậm hoặc timeout.

## 3. Hệ quả

- Ngăn chặn hoàn toàn rủi ro trừ tiền kép.
- Đảm bảo tính nhất quán ngay cả khi client bấm nút liên tục nhiều lần.
