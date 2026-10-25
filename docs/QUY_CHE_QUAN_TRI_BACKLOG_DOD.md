# QUY CHẾ QUẢN TRỊ DỰ ÁN: PRODUCT BACKLOG & DEFINITION OF DONE (DoD)

## 1. Bảng Product Backlog Chi tiết cho 2 Sprint (10 User Stories)

| Sprint | Mã Story | Tên User Story | Mô tả & Tiêu chí chấp nhận cốt lõi (Acceptance Criteria) | Story Points | Người phụ trách đề xuất |
|---|---|---|---|:---:|---|
| **Sprint 1** | **US-00** | Khởi tạo Monorepo & Cấu hình Docker | Cấu trúc apps/web, apps/api, docs; docker-compose up chạy được; .env.example; README. | 3 | TV 6 (DevOps) |
| **Sprint 1** | **US-01** | Backend: API Thực đơn sản phẩm | GET /products trả mảng active; GET /products/:id trả chi tiết; 404 khi sai ID; seed 4 món nước. | 5 | TV 2 (Catalog) |
| **Sprint 1** | **US-02** | Frontend: Giao diện Menu Mobile | Next.js gọi API thật; xử lý đủ 3 trạng thái: Loading (Skeleton), Empty, Error (Retry); responsive. | 5 | TV 1 (FE Lead) |
| **Sprint 1** | **US-03** | CI Quality Gate & Branch Protection | GitHub Actions chạy 4 bước (Install->Lint->Test->Build); cấm merge khi fail; có bằng chứng pass/fail. | 3 | TV 6 (Task 4 Lead) |
| **Sprint 2** | **US-04** | Tùy biến Size, Topping & Giỏ hàng | Chọn size S/M/L, chọn nhiều topping, tính tổng tạm; giỏ hàng thêm/sửa/xóa; badge cập nhật. | 5 | TV 1 (FE Lead) |
| **Sprint 2** | **US-05** | Đăng ký, Đăng nhập & Xác thực JWT | POST /auth/register băm bcrypt; POST /auth/login trả JWT; guard bảo vệ các route nhạy cảm. | 5 | TV 3 (Auth/DB) |
| **Sprint 2** | **US-06** | Tạo đơn hàng & Khóa tồn kho nguyên tử | POST /orders trong DB Transaction; atomic conditional update trừ tồn kho; ném 409 khi hết hàng. | 8 | TV 4 (Orders) |
| **Sprint 2** | **US-07** | Thanh toán Mock & Chống lặp Idempotency| POST /payments nhận Idempotency-Key; chống thanh toán trùng; cập nhật PAID / PAYMENT_FAILED. | 8 | TV 5 (Payments) |
| **Sprint 2** | **US-08** | Xác nhận đơn hàng & Lịch sử cá nhân | Hiển thị mã đơn #ID và trạng thái PAID; GET /orders/me chỉ trả đơn của chính user từ JWT. | 5 | TV 1 & TV 4 |
| **Sprint 2** | **US-09** | CD Pipeline & Bàn giao Production | Deploy lên Linux VPS qua SSH; reverse proxy Caddy HTTPS; smoke test /health; tài liệu rollback. | 8 | TV 6 (DevOps) |

---

## 2. Quy ước Phân nhánh (Branching Strategy)
- Nhánh `main`: Nhánh chính sản xuất, luôn luôn xanh (đạt 100% CI pass). Cấm commit trực tiếp lên `main`.
- Nhánh tính năng: `feature/<mã-issue>-<tên-ngắn>` (vd: `feature/TASK-03-menu-page`).
- Nhánh sửa lỗi: `fix/<mã-issue>-<tên-ngắn>`.
- Mỗi Pull Request bắt buộc phải có ít nhất 1 người review và vượt qua 100% kiểm tra CI trước khi merge.

---

## 3. Tiêu chuẩn Hoàn thành (Definition of Done - DoD)
Một User Story hoặc Task chỉ được coi là hoàn thành (Done) khi thỏa mãn:
1. Mã nguồn build thành công, không phát sinh lỗi lint hoặc lỗi biên dịch.
2. Đã viết kiểm thử tự động (Unit test / Component test) và tất cả test đều PASS.
3. Đáp ứng 100% Tiêu chí chấp nhận (Acceptance Criteria) đã cam kết trong Backlog.
4. Giao diện người dùng xử lý đầy đủ cả 3 trạng thái: Loading, Empty và Error.
5. Tài liệu kỹ thuật liên quan (SRS, Diagrams, Ma trận truy vết) được cập nhật đồng bộ trong cùng PR.
6. PR được review và merge vào `main` sau khi CI kiểm tra đạt kết quả XANH.
