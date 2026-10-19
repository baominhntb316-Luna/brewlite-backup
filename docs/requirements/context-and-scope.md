# BrewLite – Bối Cảnh, Stakeholder và Phạm Vi Hệ Thống (Context & Scope)

> **Mã tạo phẩm**: DOC-REQ-01  
> **Căn cứ**: Đề bài Assignment 2 – Mục 3.1 (Task 1.1)  
> **Mục tiêu**: Xác định rõ bài toán nghiệp vụ, các bên liên quan, phạm vi giải pháp trong MVP, giả định, ràng buộc kỹ thuật và phân tích rủi ro ban đầu.

---

## 1. Vấn đề nghiệp vụ (Business Context & Problem Statement)

Trong các mô hình quán cà phê và trà sữa hiện đại, khách hàng thường xuyên phải đối mặt với tình trạng xếp hàng dài chờ gọi món và thanh toán tiền mặt tại quầy vào các khung giờ cao điểm. Quy trình thủ công này phát sinh nhiều nhược điểm:
- **Tốn thời gian chờ đợi**: Khách hàng mất từ 10–20 phút chỉ để gọi món và chờ thối tiền lẻ.
- **Rủi ro sai sót giá và tùy chọn**: Khách hàng chọn size (S/M/L) và nhiều loại topping; nhân viên quầy có thể tính nhầm tiền hoặc ghi sai món.
- **Vượt tồn kho (Overselling)**: Trong giờ cao điểm, nhiều khách hàng đặt cùng lúc một món đồ uống có số lượng nguyên liệu giới hạn. Nếu không có cơ chế kiểm soát tồn kho đồng thời ở backend, hệ thống sẽ bán vượt số lượng thực tế.
- **Rủi ro thanh toán trùng lặp (Double Charging)**: Khách hàng sử dụng thiết bị di động với kết nối mạng 3G/4G chập chờn. Khi thao tác thanh toán bị chậm, khách có xu hướng bấm nút nhiều lần. Nếu thiếu cơ chế chống xử lý lặp (Idempotency), giao dịch sẽ bị trừ tiền nhiều lần.

**BrewLite** được xây dựng nhằm giải quyết triệt để các vấn đề trên thông qua luồng đặt hàng trực tuyến trên thiết bị di động (mobile-first), thanh toán không dùng tiền mặt, kiểm soát tính toán giá tập trung tại máy chủ, khóa tồn kho nguyên tử và bảo vệ giao dịch thanh toán bằng khóa duy nhất.

---

## 2. Các bên liên quan (Stakeholders & Expectations)

| Bên liên quan | Vai trò trong hệ thống | Kỳ vọng cốt lõi | Tác động trực tiếp đến thiết kế phần mềm |
|---|---|---|---|
| **Khách hàng (Customer)** | Tác nhân chính (Primary Actor) sử dụng ứng dụng web trên thiết bị di động. | Xem menu trực quan; tùy chọn size/topping dễ dàng; tính tiền minh bạch; thanh toán nhanh không dùng tiền mặt; nhận mã đơn và theo dõi trạng thái. | Giao diện Next.js mobile-first / PWA responsive; giỏ hàng giữ nguyên khi thanh toán thất bại; bảo vệ bằng JWT; phản hồi kết quả rõ ràng. |
| **Nhân viên quầy / Barista** | Tiếp nhận đơn hàng, pha chế đồ uống và bàn giao tại quầy. | Nhận danh sách đơn hàng đã thanh toán thành công (PAID); chuyển trạng thái đơn theo đúng quy trình tuần tự. | Máy trạng thái đơn hàng (Order State Machine) được bảo vệ nghiêm ngặt ở backend; API chuyển trạng thái có phân quyền vai trò (Role-based Guard). |
| **Quản lý cửa hàng / Product Owner** | Định hướng sản phẩm, quản lý danh mục menu, kiểm soát tồn kho và doanh thu. | Menu được cập nhật chính xác; không bị thất thoát tiền hoặc bán vượt tồn kho; báo cáo trạng thái đơn minh bạch. | Backend giữ toàn quyền quyết định giá (không tin tưởng giá từ client); áp dụng khóa bi quan/lạc quan cho tồn kho; seed data chuẩn. |
| **Giảng viên / Người nghiệm thu** | Đánh giá đồ án theo chuẩn quy trình kỹ nghệ phần mềm. | Quy trình tuần tự chặt chẽ; tính nhất quán giữa Yêu cầu -> Mô hình -> Kiến trúc -> Code -> Test; mã nguồn chạy thật; CI/CD hoạt động. | Repository monorepo minh bạch; ma trận truy vết (Traceability Matrix) đầy đủ 100%; minh chứng CI Pass và Fail có kiểm soát; URL production HTTPS. |
| **Nhóm phát triển (Dev Team)** | Phân tích, thiết kế, hiện thực, kiểm thử và vận hành hệ thống. | Cấu trúc mã nguồn rõ ràng, dễ bảo trì; quy trình tự động hóa kiểm soát chất lượng mã nguồn; khôi phục nhanh khi có sự cố. | Kiến trúc Modular Monolith; hợp đồng API chuẩn mực; pipeline CI/CD với Quality Gate nghiêm ngặt; Docker Compose chuẩn hóa môi trường local. |
| **Đơn vị thanh toán (Mock Gateway)** | Dịch vụ mô phỏng cổng thanh toán Ví/Thẻ điện tử. | Nhận yêu cầu thanh toán kèm mã giao dịch duy nhất; trả về kết quả mô phỏng (SUCCESS/FAILURE) nhất quán; không bị lặp thanh toán. | Thiết kế PaymentsModule sử dụng header `Idempotency-Key` và băm nội dung `payloadHash`; lưu trạng thái trung gian `PROCESSING`. |

---

## 3. Phạm vi sản phẩm (Product Scope)

### 3.1. Phạm vi trong MVP (In-Scope - Bắt buộc hoàn thành)
- **Danh mục thực đơn (Menu)**: Hiển thị danh sách đồ uống kèm ảnh, tên, giá cơ bản, trạng thái còn hàng. Lấy chi tiết đồ uống kèm các tùy chọn size (S/M/L) và topping.
- **Tùy biến món & Giỏ hàng (Cart)**: Chọn size, chọn nhiều topping; thêm vào giỏ, điều chỉnh số lượng (nguyên dương $\ge 1$), xóa món, tính tổng tiền tạm thời trên giao diện.
- **Xác thực người dùng (Authentication)**: Đăng ký tài khoản, đăng nhập trả về mã thông báo JWT; mã hóa mật khẩu an toàn bằng bcrypt; route guard bảo vệ các thao tác nhạy cảm.
- **Tạo đơn hàng (Order Placement)**: Backend nhận giỏ hàng, xác thực người dùng qua JWT, kiểm tra tính khả dụng của từng món/topping, tính lại toàn bộ giá tiền từ CSDL, kiểm tra và giữ tồn kho nguyên tử trong một Transaction duy nhất; tạo đơn hàng ở trạng thái `PENDING`.
- **Thanh toán mô phỏng (Mock Payment & Idempotency)**: Thanh toán đơn qua Ví điện tử hoặc Thẻ ngân hàng mô phỏng; xử lý cơ chế chống lặp giao dịch bằng `Idempotency-Key` duy nhất; chuyển trạng thái đơn hàng sang `PAID` (nếu thành công) hoặc `PAYMENT_FAILED` (nếu thất bại).
- **Xác nhận đơn & Lịch sử (Confirmation & Order History)**: Hiển thị màn hình xác nhận kèm mã đơn hàng duy nhất; xem danh sách lịch sử các đơn hàng cá nhân của người dùng đã đăng nhập (`GET /orders/me`).
- **Nền tảng kỹ thuật & Vận hành**: Docker Compose chạy đầy đủ Web, API và PostgreSQL; pipeline CI kiểm soát chất lượng; triển khai Production bảo mật HTTPS và health check.

### 3.2. Phạm vi mở rộng / Phiên bản sau (Out-of-Scope)
- Tích hợp cổng thanh toán ngân hàng thật hoặc xử lý số thẻ tín dụng thực tế (chỉ sử dụng mock gateway).
- Nghiệp vụ giao hàng tận nơi (delivery), tính cước vận chuyển, phân công tài xế (chỉ nhận đồ uống tại quầy).
- Hệ thống quản lý thành viên đa cấp phức tạp (Tiered VIP, Loyalty marketing automation).
- Giao diện Admin quản trị tổng thể chuỗi cửa hàng, quản lý ca kíp nhân viên, tích hợp máy in hóa đơn cứng (POS/ERP).
- Kiến trúc Microservices phức tạp (chọn kiến trúc Modular Monolith để tối ưu hóa nguồn lực và độ tin cậy trong phạm vi đồ án).

---

## 4. Giả định và Ràng buộc kỹ thuật (Assumptions & Constraints)

### 4.1. Giả định (Assumptions)
1. **Mô hình phục vụ**: Khách hàng đặt món và trực tiếp nhận đồ uống tại quầy của cửa hàng.
2. **Dữ liệu thực đơn khởi tạo**: Hệ thống có sẵn bộ dữ liệu seed mẫu ổn định gồm ít nhất 4 món đồ uống tiêu biểu (Cà phê sữa, Americano, Cappuccino, Trà đào) cùng các tùy chọn size và topping.
3. **Cổng thanh toán giả lập**: Dịch vụ Mock Payment Service cho phép kiểm thử chủ động cả hai nhánh kịch bản Thành công (SUCCESS) và Thất bại (FAILURE) dựa trên cấu hình môi trường hoặc dữ liệu đầu vào, không phụ thuộc vào tính ngẫu nhiên.
4. **Bắt buộc đăng nhập trước khi tạo đơn**: Khách hàng có thể tự do duyệt thực đơn và thêm món vào giỏ; tuy nhiên, trước khi xác nhận tạo đơn hàng (`POST /orders`), hệ thống bắt buộc khách hàng phải đăng nhập để gắn định danh người dùng vào đơn.

### 4.2. Ràng buộc kỹ thuật bắt buộc (Constraints)
1. **Ngăn xếp công nghệ cốt lõi**:
   - Frontend: **Next.js** (TypeScript, React, mobile-first / PWA).
   - Backend: **NestJS** (TypeScript, RESTful API).
   - Cơ sở dữ liệu: **PostgreSQL**.
   - Đóng gói & triển khai: **Docker & Docker Compose**.
   *(Tuyệt đối không thay thế 3 công nghệ bắt buộc này bằng công nghệ khác).*
2. **Nguyên tắc bảo vệ dữ liệu**:
   - Toàn bộ giá tiền, mã giảm giá, kiểm tra tồn kho và chuyển trạng thái đơn hàng phải do **Backend quyết định hoàn toàn**. Không tin tưởng bất kỳ giá trị tổng tiền (`total`) nào do Frontend gửi lên.
   - Định danh khóa chính sử dụng chuẩn `UUID` để tránh rủi ro đoán mã hoặc trùng lặp.
   - Tiền tệ được biểu diễn bằng số nguyên VND (hoặc kiểu Decimal/Numeric chuẩn trong DB), nghiêm cấm sử dụng số thực dấu phẩy động (floating point `float`/`double`) để tính toán tiền tệ.
3. **Quy chuẩn quản lý phiên bản và mã nguồn**:
   - Mọi thay đổi về mã nguồn hoặc tài liệu phải thông qua Pull Request (PR) và có rà soát mã (Code Review).
   - Nhánh `main` được bảo vệ bằng CI Quality Gate: cấm tuyệt đối merge khi bước Lint, Test hoặc Build bị lỗi.
   - Cơ sở dữ liệu Production tuyệt đối không public cổng ra ngoài Internet (chỉ giao tiếp trong mạng nội bộ Docker network). Toàn bộ Secret và mật khẩu phải được lưu ở môi trường an toàn, không commit vào kho mã nguồn Git.

---

## 5. Phân tích Rủi ro Ban đầu & Chiến lược Phòng ngừa (Risk Assessment)

| Rủi ro kỹ thuật / nghiệp vụ | Xác suất / Mức độ ảnh hưởng | Biện pháp kỹ thuật phòng ngừa và ứng phó |
|---|---|---|
| **Bán vượt tồn kho khi nhiều khách đặt cùng lúc (Overselling Concurrency)** | Trung bình / Rất cao | Áp dụng câu lệnh cập nhật có điều kiện nguyên tử (`UPDATE Product SET stock = stock - qty WHERE id = :id AND stock >= :qty`) kết hợp Transaction của CSDL. Nếu không cập nhật đủ số dòng, lập tức Rollback và trả về mã lỗi `409 OUT_OF_STOCK`. |
| **Thanh toán bị lặp lại do bấm nhiều lần hoặc retry mạng (Double Charging)** | Trung bình / Rất cao | Yêu cầu header `Idempotency-Key` duy nhất cho mỗi phiên thanh toán; lưu bản ghi thanh toán kèm băm nội dung `payloadHash`. Nếu gặp lại cùng Key và Payload, trả về ngay kết quả đã lưu mà không gọi lại Mock Gateway. |
| **Sai lệch giá giữa Frontend và Backend** | Trung bình / Cao | Backend bỏ qua hoàn toàn giá tiền gửi từ client; truy vấn trực tiếp đơn giá gốc của sản phẩm, giá chênh lệch theo size và phụ phí topping từ CSDL để tính lại tổng tiền. |
| **Mất dữ liệu khi container CSDL khởi động lại** | Thấp-Trung bình / Rất cao | Cấu hình Docker Named Volume gắn kết cố định (`postgres_data:/var/lib/postgresql/data`); viết migration và seed script chuẩn để có thể tái tạo CSDL mọi lúc. |
| **Lộ mật khẩu và khóa bí mật (Secrets Leakage)** | Trung bình / Rất cao | Cấu hình `.gitignore` chặn toàn bộ file `.env*` (chỉ commit `.env.example` chứa placeholder rỗng); biến nhạy cảm trên Production được nạp qua Secret Store của hệ điều hành / CI/CD; thiết lập filter không ghi token/mật khẩu vào Log. |
| **Pipeline CI/CD thất bại làm gián đoạn hệ thống Production** | Trung bình / Cao | Triển khai Quality Gate nhiều tầng; build Docker image gắn tag bất biến bằng Git Commit SHA (`${{ github.sha }}`); thực hiện Smoke test tự động sau khi deploy; lưu sẵn quy trình Rollback về phiên bản ổn định trước đó. |
