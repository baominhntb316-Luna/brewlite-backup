# BrewLite – Đặc Tả Use-Case Trọng Tâm UC-05 (Focal Use Case Specification)

> **Mã tạo phẩm**: DOC-REQ-03  
> **Căn cứ**: Đề bài Assignment 2 – Mục 3.3 (Task 1.3)  
> **Tên Use-Case**: UC-05 – Đặt và thanh toán đơn hàng (Checkout & Cashless Payment)  
> **Tác nhân chính (Primary Actor)**: Khách hàng (Customer)  
> **Tác nhân hỗ trợ (Supporting Actors)**: Dịch vụ thanh toán mô phỏng (Mock Payment Service), Hệ quản trị CSDL PostgreSQL.

---

## 1. Thông tin tổng quan Use-Case

| Thuộc tính | Chi tiết đặc tả |
|---|---|
| **Mục tiêu (Goal)** | Chuyển đổi giỏ hàng hợp lệ thành đơn hàng chính thức có mã định danh duy nhất, thực hiện thanh toán không tiền mặt qua Ví/Thẻ mô phỏng, ghi nhận doanh thu và cấp biên nhận xác nhận chính xác cho khách hàng. |
| **Sự kiện kích hoạt (Trigger)** | Khách hàng nhấn nút "Thanh toán" hoặc "Xác nhận trả" khi giỏ hàng có ít nhất một sản phẩm. |
| **Tiền điều kiện (Preconditions)** | 1. Ứng dụng Next.js kết nối thành công tới NestJS API.<br>2. Giỏ hàng trên máy khách có ít nhất 1 sản phẩm với số lượng $\ge 1$.<br>3. Khách hàng đã đăng nhập tài khoản (đã có mã Bearer JWT hợp lệ).<br>4. Các dịch vụ hệ thống và CSDL hoạt động bình thường (`GET /health` trả về healthy). |
| **Hậu điều kiện thành công (Postconditions - Success)** | 1. Bản ghi `Order` được tạo ở trạng thái `PAID` kèm tổng tiền chính xác do server tính.<br>2. Các bản ghi `OrderItem` lưu đúng đơn giá tại thời điểm mua (price snapshot).<br>3. Tồn kho của các sản phẩm liên quan bị trừ tương ứng.<br>4. Bản ghi `Payment` lưu trạng thái `SUCCEEDED` kèm `idempotencyKey` duy nhất.<br>5. Bản ghi `LoyaltyTransaction` cộng điểm thưởng một lần duy nhất cho khách hàng.<br>6. Giao diện khách hàng hiển thị mã đơn hàng, trạng thái `PAID` và làm mới giỏ hàng. |
| **Hậu điều kiện thất bại (Postconditions - Failure)** | 1. Tuyệt đối không có khoản trừ tiền trùng lặp.<br>2. Nếu thanh toán lỗi, đơn hàng lưu trạng thái `PAYMENT_FAILED`, toàn bộ tồn kho đã tạm giữ được hoàn trả nguyên trạng.<br>3. Số lượng tồn kho trong CSDL không bao giờ bị âm ($stock \ge 0$).<br>4. Giỏ hàng trên máy khách được bảo lưu nguyên vẹn để người dùng có thể thử lại. |
| **Yêu cầu liên quan (Linked Requirements)** | FR-03, FR-05, FR-06, FR-07, FR-08, FR-09, FR-13, FR-14, FR-15, FR-17; NFR-01, NFR-02, NFR-03, NFR-04. |
| **API Endpoints liên quan** | `POST /orders`, `POST /payments`, `GET /orders/me`, `GET /health`. |

---

## 2. Kịch bản Luồng chính (Main Success Flow - Happy Path)

| Bước | Tác nhân | Hành động thực hiện |
|:---:|---|---|
| **1** | Khách hàng | Mở ứng dụng BrewLite, duyệt danh mục menu và chọn một hoặc nhiều món đồ uống. |
| **2** | Khách hàng | Chọn kích cỡ (Size S/M/L), chọn các loại topping mong muốn và số lượng; nhấn "Thêm vào giỏ". Giao diện cập nhật số lượng và tổng tiền tạm tính. |
| **3** | Khách hàng | Mở màn hình giỏ hàng và nhấn nút "Thanh toán". Nếu khách hàng chưa đăng nhập, hệ thống chuyển hướng đến trang Đăng nhập để xác thực, sau đó quay trở lại trang Thanh toán cùng mã token Bearer JWT. |
| **4** | Ứng dụng Next.js | Gửi yêu cầu HTTP `POST /orders` tới NestJS API kèm tiêu đề `Authorization: Bearer <JWT>` và thân request chứa danh sách các món: `[{ productId, size, qty, toppingIds }]`, kèm mã khuyến mãi (nếu có). Lưu ý: Client không gửi trường `total` hoặc nếu có gửi thì server hoàn toàn bỏ qua. |
| **5** | NestJS Backend | Bộ lọc `JwtAuthGuard` xác thực token; `ValidationPipe` kiểm tra tính hợp lệ của DTO. Backend truy vấn CSDL để lấy đơn giá gốc, giá chênh lệch của size và phụ phí topping tại thời điểm hiện tại. |
| **6** | NestJS Backend | Mở một **Database Transaction**: Kiểm tra và giữ tồn kho bằng câu lệnh cập nhật có điều kiện; tính toán tổng tiền chính xác; tạo bản ghi `Order` ở trạng thái `PENDING` và các bản ghi `OrderItem`. Commit transaction. |
| **7** | NestJS Backend | Trả về mã HTTP `201 Created` kèm `orderId`, tổng tiền `total` do máy chủ tính và trạng thái `PENDING`. |
| **8** | Khách hàng | Chọn phương thức thanh toán không tiền mặt (Ví điện tử - `WALLET` hoặc Thẻ ngân hàng - `CARD`). |
| **9** | Ứng dụng Next.js | Sinh một khóa ngẫu nhiên duy nhất `Idempotency-Key` (UUIDv4) đại diện cho lần thanh toán này và gửi `POST /payments` kèm `orderId`, `method` và `Idempotency-Key`. |
| **10** | NestJS Backend | Kiểm tra khóa `Idempotency-Key` trong CSDL. Do đây là khóa mới, backend tạo bản ghi `Payment` với trạng thái `PROCESSING` và lưu `payloadHash`. |
| **11** | NestJS Backend | Gọi dịch vụ Mock Payment Service bên ngoài (không giữ mở Database Transaction trong lúc gọi mạng). Mock Gateway phản hồi kết quả `SUCCESS`. |
| **12** | NestJS Backend | Mở Database Transaction ngắn: Cập nhật bản ghi `Payment` sang `SUCCEEDED`, cập nhật trạng thái `Order` sang `PAID`, và ghi nhận điểm tích lũy vào bảng `LoyaltyTransaction` (có ràng buộc duy nhất theo `orderId`). Commit transaction. |
| **13** | NestJS Backend | Trả về mã HTTP `200 OK` kèm thông tin thanh toán hoàn tất và mã đơn hàng đã xác nhận. |
| **14** | Ứng dụng Next.js | Hiển thị màn hình xác nhận đặt hàng thành công, hiển thị mã đơn hàng `#ID`, trạng thái `PAID`, tổng tiền và lời mời tới quầy nhận đồ uống khi hoàn tất. Xóa dữ liệu giỏ hàng. |

---

## 3. Kịch bản Luồng thay thế và Ngoại lệ (Alternate & Exception Flows)

- **A1 – Người dùng chưa đăng nhập khi bấm thanh toán**:
  - Tại Bước 3, hệ thống phát hiện chưa có token JWT hợp lệ.
  - Giao diện lưu tạm trạng thái giỏ hàng vào bộ nhớ cục bộ (Local Storage/State) và chuyển hướng người dùng đến màn hình Đăng nhập.
  - Người dùng đăng nhập thành công, nhận token JWT và được điều hướng tự động quay lại màn hình giỏ hàng để tiếp tục thanh toán. Tuyệt đối không tạo đơn hàng trước khi xác thực.

- **A2 – Giỏ hàng rỗng**:
  - Nếu người dùng truy cập trang thanh toán khi giỏ hàng rỗng, nút "Thanh toán" bị vô hiệu hóa (disabled).
  - Nếu có request cố tình gọi `POST /orders` với danh sách rỗng, backend trả về HTTP `400 Bad Request` kèm thông báo `"Cart must contain at least one item"`. Không có đơn hàng nào được tạo.

- **A3 – Hết hàng trong lúc thanh toán (Out-of-Stock Race Condition)**:
  - Tại Bước 6, câu lệnh cập nhật tồn kho có điều kiện phát hiện số lượng tồn kho hiện tại nhỏ hơn số lượng yêu cầu của khách hàng (`stock < qty`).
  - Backend lập tức `ROLLBACK` toàn bộ Database Transaction, không ghi nhận đơn hàng dở dang.
  - Backend trả về HTTP `409 Conflict` với mã lỗi nghiệp vụ `"OUT_OF_STOCK"`.
  - Giao diện hiển thị thông báo món đã hết hàng, giữ nguyên giỏ hàng để khách hàng có thể điều chỉnh số lượng hoặc chọn món khác.

- **A4 – Thay đổi giá hoặc tùy chọn không còn kinh doanh**:
  - Tại Bước 5, backend phát hiện món đồ uống hoặc topping khách hàng chọn đã bị tắt (`isActive = false`).
  - Backend từ chối tạo đơn, trả về HTTP `409 Conflict` với thông báo `"PRODUCT_OR_OPTION_UNAVAILABLE"`.
  - Giao diện làm mới lại thực đơn và yêu cầu khách hàng chọn lại tùy chọn hợp lệ.

- **A5 – Mã khuyến mãi không hợp lệ hoặc hết lượt**:
  - Tại Bước 5, nếu mã giảm giá đã hết hạn, chưa đạt giá trị đơn tối thiểu, hoặc đã hết hạn mức sử dụng (`usageCount >= usageLimit`), backend từ chối áp dụng mã và trả về thông báo lỗi chi tiết. Đơn hàng sẽ không được giảm giá sai quy định.

- **A6 – Thanh toán thất bại từ cổng thanh toán (Payment Failure)**:
  - Tại Bước 11, Mock Gateway trả về kết quả `FAILURE` (do tài khoản ví không đủ số dư hoặc thẻ bị từ chối).
  - Backend mở transaction: Cập nhật bản ghi `Payment` sang trạng thái `FAILED`, cập nhật trạng thái `Order` sang `PAYMENT_FAILED`, và giải phóng hoàn trả lại số lượng tồn kho đã tạm giữ.
  - Backend trả về mã lỗi thanh toán.
  - Giao diện hiển thị thông báo thanh toán không thành công, bảo lưu giỏ hàng và cung cấp nút "Thử lại bằng phương thức khác".

- **A7 – Client gửi lại yêu cầu cùng Idempotency-Key và cùng Payload (Retry Idempotency)**:
  - Tại Bước 10, backend kiểm tra và phát hiện `Idempotency-Key` đã tồn tại trong CSDL và có cùng `payloadHash`.
  - Backend không gọi lại Mock Gateway, không trừ tiền và không cộng điểm lần hai.
  - Backend trả về ngay kết quả giao dịch đã lưu trước đó (`SUCCEEDED` hoặc `PROCESSING`).

- **A8 – Client tái sử dụng Idempotency-Key nhưng đổi Payload**:
  - Tại Bước 10, backend phát hiện `Idempotency-Key` đã tồn tại nhưng chuỗi băm `payloadHash` khác với giao dịch ban đầu.
  - Backend từ chối xử lý, trả về HTTP `409 Conflict` kèm mã lỗi `"IDEMPOTENCY_KEY_REUSED_WITH_DIFFERENT_PAYLOAD"`. Bản ghi giao dịch cũ được bảo vệ an toàn.

- **A9 – Cổng thanh toán bị quá hạn (Gateway Timeout / Unknown Status)**:
  - Tại Bước 11, kết nối tới Mock Payment Service bị quá hạn (timeout) và chưa rõ trạng thái thành công hay thất bại.
  - Backend không tự ý đánh dấu là thất bại; lưu trạng thái giao dịch là `UNKNOWN` / `PROCESSING`.
  - Client khi thử lại bắt buộc phải gửi cùng `Idempotency-Key` cũ để backend tiến hành đối soát, ngăn ngừa việc tạo giao dịch trừ tiền hai lần.

- **A10 – Lỗi cơ sở dữ liệu khi commit**:
  - Bất kỳ lỗi hệ thống nào xảy ra trước khi câu lệnh `COMMIT` hoàn tất đều kích hoạt `ROLLBACK` toàn bộ.
  - Backend trả về HTTP `500 Internal Server Error`, ghi log kèm `correlationId` và không bao giờ phản hồi `PAID` cho người dùng.

- **A11 – Chuyển trạng thái đơn hàng bất hợp lệ**:
  - Mọi yêu cầu chuyển đổi trạng thái không tuân thủ đường đi của máy trạng thái (ví dụ cố gắng chuyển đơn từ `COMPLETED` về lại `PREPARING`, hoặc từ `PENDING` nhảy cóc sang `READY`) đều bị hàm kiểm tra `assertTransition` chặn đứng và trả về mã lỗi `400 Bad Request`.
