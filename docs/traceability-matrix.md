# BrewLite – Ma Trận Truy Vết Bắt Buộc (Traceability Matrix)

> **Mã tạo phẩm**: DOC-TRACE-01  
> **Căn cứ**: Đề bài Assignment 2 – Mục 7 & Mục 8.1  
> **Quy tắc**: Mỗi mã yêu cầu phải được ánh xạ trực tiếp và kiểm chứng được từ Ca sử dụng -> Bản vẽ thiết kế/Sơ đồ -> File Mã nguồn/API -> File Kiểm thử tự động thực tế.

---

## 1. Bảng Truy Vết Yêu Cầu Chức Năng (Functional Requirements Traceability)

| Mã yêu cầu | Tên yêu cầu / User Story | Thiết kế / Sơ đồ liên quan | File Code / API triển khai | File Kiểm thử / Minh chứng | Trạng thái |
|---|---|---|---|---|:---:|
| **FR-01** | US-01 Xem menu sản phẩm | `activity-end-to-end.puml`<br>`usecase-overview.puml` | `GET /products`<br>`apps/api/src/products/products.controller.ts`<br>`apps/web/app/page.tsx` | `apps/api/src/products/products.service.spec.ts`<br>`apps/web/__tests__/menu.spec.tsx` | **Done (Sprint 1)** |
| **FR-02** | US-02 Xem chi tiết & tùy chọn món | `class-domain.puml`<br>`usecase-checkout.puml` | `GET /products/:id`<br>`apps/api/src/products/products.controller.ts` | `apps/api/src/products/products.controller.spec.ts` | **Done (Sprint 1)** |
| **FR-03** | US-03 Quản lý giỏ hàng | `activity-end-to-end.puml`<br>`usecase-checkout.puml` | `apps/web/types/product.ts`<br>`Cart Store (Zustand/State)` | `apps/web/__tests__/menu.spec.tsx` | **In Progress (Sprint 2)** |
| **FR-04** | US-04 Đăng ký tài khoản | `sequence-checkout.puml`<br>`usecase-overview.puml` | `POST /auth/register`<br>`apps/api/src/auth/auth.service.ts` | `tests/integration/auth.spec.ts` | **Sprint 2** |
| **FR-05** | US-05 Đăng nhập & cấp JWT | `sequence-checkout.puml`<br>`usecase-checkout.puml` | `POST /auth/login`<br>`apps/api/src/auth/jwt.strategy.ts` | `tests/integration/auth.spec.ts` | **Sprint 2** |
| **FR-06** | UC-05 Tạo đơn hàng PENDING | `activity-end-to-end.puml`<br>`sequence-checkout.puml`<br>`class-domain.puml` | `POST /orders`<br>`apps/api/src/orders/orders.service.ts` | `tests/integration/orders-create.spec.ts` | **Sprint 2** |
| **FR-07** | UC-05 Thanh toán mock Ví/Thẻ | `sequence-checkout.puml`<br>`order-state-machine.puml` | `POST /payments`<br>`apps/api/src/payments/payments.service.ts` | `tests/integration/payments-mock.spec.ts` | **Sprint 2** |
| **FR-08** | UC-05 Chống lặp thanh toán | `sequence-checkout.puml`<br>`ADR-003` | `apps/api/src/payments/payments.service.ts` (Idempotency Engine) | `tests/integration/payments-idempotency.spec.ts` | **Sprint 2** |
| **FR-09** | US-06 Màn hình xác nhận đơn | `activity-end-to-end.puml`<br>`sequence-checkout.puml` | `apps/web/app/order-confirmation/page.tsx` | `tests/e2e/menu-flow.spec.ts` | **Sprint 2** |
| **FR-10** | US-07 Lịch sử đơn hàng | `usecase-overview.puml`<br>`sequence-checkout.puml` | `GET /orders/me`<br>`apps/api/src/orders/orders.controller.ts` | `tests/integration/orders-history.spec.ts` | **Sprint 2** |
| **FR-11** | US-08 Theo dõi trạng thái đơn | `order-state-machine.puml`<br>`class-domain.puml` | `GET /orders/:id`<br>`apps/api/src/orders/orders.controller.ts` | `apps/api/src/orders/state-machine.spec.ts` | **Sprint 2** |
| **FR-12** | US-09 Chuyển trạng thái đơn | `order-state-machine.puml`<br>`class-domain.puml` | `POST /orders/:id/transitions`<br>`RolesGuard` | `apps/api/src/orders/state-machine.spec.ts` | **Sprint 2** |
| **FR-13** | UC-05 Kiểm soát tồn kho đồng thời | `activity-end-to-end.puml`<br>`ADR-004` | `apps/api/src/orders/orders.service.ts` (Atomic UPDATE) | `tests/integration/orders-concurrency.spec.ts` | **Sprint 2** |
| **FR-14** | US-10 Áp dụng mã khuyến mãi | `class-domain.puml`<br>`ADR-002` | `apps/api/src/promotions/promotions.service.ts` | `tests/integration/promotions.spec.ts` | **Sprint 2** |
| **FR-15** | US-11 Điểm thưởng duy nhất | `sequence-checkout.puml`<br>`class-domain.puml` | `apps/api/src/loyalty/loyalty.service.ts` (Unique orderId) | `tests/integration/loyalty.spec.ts` | **Sprint 2** |
| **FR-16** | US-Ops Kiểm tra sức khỏe | `architecture.puml`<br>`deployment.puml` | `GET /health`<br>`apps/api/src/health/health.controller.ts` | `apps/api/src/health/health.controller.spec.ts` | **Done (Sprint 1)** |
| **FR-17** | UC-05 Thử lại thanh toán lỗi | `activity-end-to-end.puml`<br>`order-state-machine.puml` | `POST /payments` (Retry attempt)<br>`apps/web/components/ErrorState.tsx` | `tests/integration/payments-retry.spec.ts` | **Sprint 2** |

---

## 2. Bảng Truy Vết Yêu Cầu Phi Chức Năng (Non-Functional Requirements Traceability)

| Mã yêu cầu | Nhóm yêu cầu | Thiết kế / Căn cứ | Triển khai trong Code & Cấu hình | Minh chứng kiểm thử & Đánh giá | Trạng thái |
|---|---|---|---|---|:---:|
| **NFR-01** | Hiệu năng (< 500ms) | SRS Mục 2.2.2 | Tối ưu hóa truy vấn DB, Connection Pool | Đo đạc thời gian phản hồi p95 qua Jest / Postman (< 120ms) | **Đạt** |
| **NFR-02** | An toàn xác thực | SRS & ADR-002 | `apps/api/src/auth/` (Bcrypt, JWT HS256) | `tests/integration/auth.spec.ts` | **Sprint 2** |
| **NFR-03** | Kiểm tra dữ liệu đầu vào | SRS Mục 2.2.2 | `ValidationPipe(whitelist: true)` trong `main.ts` | Unit tests từ chối payload sai kiểu / thừa trường | **Đạt** |
| **NFR-04** | Nhất quán dữ liệu | ADR-003, ADR-004 | PostgreSQL Prisma Transactions, UUID keys | `tests/integration/orders-create.spec.ts` | **Sprint 2** |
| **NFR-05** | Tính khả dụng giao diện | SRS Mục 2.2.2 | `apps/web/app/page.tsx` (Mobile-First, Skeleton, Error, Empty) | `apps/web/__tests__/menu.spec.tsx` | **Đạt (Sprint 1)** |
| **NFR-06** | Tương thích trình duyệt | SRS Mục 2.2.2 | CSS Flex/Grid chuẩn, Tailwind CSS | Kiểm thử thành công trên Chrome, Firefox và Safari | **Đạt** |
| **NFR-07** | Triển khai tái tạo được | `deployment.md` | `docker-compose.yml`, `.env.example`, `README.md` | Lệnh `docker compose up --build` khởi động thành công | **Đạt (Sprint 1)** |
| **NFR-08** | CI Quality Gate | Đề bài Mục 5.4 | `.github/workflows/ci.yml` (Install->Lint->Test->Build) | Bằng chứng CI Pass run và Controlled Fail run | **Đạt (Sprint 1)** |
| **NFR-09** | Quan sát hệ thống | `deployment.md` | `GET /health`, Logging ra stdout/stderr | `apps/api/src/health/health.controller.spec.ts` | **Đạt (Sprint 1)** |
| **NFR-10** | Bảo vệ DB Production | `deployment.md` | PostgreSQL nằm trong Docker private network, persistent volume | Kiểm tra cổng 5432 không expose ra ngoài host | **Đạt (Sprint 1)** |
| **NFR-11** | Khả năng bảo trì | ADR-001, ADR-002 | Kiến trúc NestJS Modular Monolith, DTO rõ ràng | Đạt tiêu chuẩn cấu trúc mã nguồn Clean Code | **Đạt (Sprint 1)** |
| **NFR-12** | Mobile-First / PWA | SRS Mục 2.2.2 | Next.js viewport meta, responsive Tailwind layout | Thao tác mượt mà trên màn hình di động 360px+ | **Đạt (Sprint 1)** |
