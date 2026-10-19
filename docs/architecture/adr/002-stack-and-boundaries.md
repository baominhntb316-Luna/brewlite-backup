# ADR-002: Lựa Chọn Ngăn Xếp Công Nghệ và Ranh Giới Kiến Trúc

> **Trạng thái**: Đã chấp thuận (Accepted)  
> **Ngày quyết định**: 2026-10-19  
> **Căn cứ**: Đề bài Assignment 2 – Mục 1, Mục 4.1 và Mục 5.1

---

## 1. Bối cảnh và Đặt vấn đề

Đề bài Assignment 2 đặt ra ràng buộc kỹ thuật bắt buộc:
- Frontend: Next.js (mobile-first / PWA).
- Backend: NestJS REST API.
- Cơ sở dữ liệu: PostgreSQL.
- Đóng gói: Docker & Docker Compose.

Nhóm cần phân định ranh giới trách nhiệm (Architectural Boundaries) giữa các thành phần để tránh rủi ro bảo mật và sai lệch dữ liệu.

## 2. Quyết định (Decision)

1. **Frontend (Next.js 14+)**:
   - Đóng vai trò là Tầng Trình Diễn (Presentation Layer).
   - Thiết kế ưu tiên di động (Mobile-First UI), quản lý trạng thái giỏ hàng (Cart state) và hiển thị đầy đủ 3 trạng thái: Loading, Empty, Error.
   - **Ranh giới**: Frontend **không phải là nguồn dữ liệu tin cậy**. Client không bao giờ quyết định đơn giá, tổng tiền (`total`), số tiền giảm giá (`discount`) hay tự ý đổi trạng thái đơn hàng sang `PAID`.
2. **Backend (NestJS Modular Monolith)**:
   - Tổ chức theo miền nghiệp vụ: `AuthModule`, `ProductsModule`, `OrdersModule`, `PaymentsModule`, `HealthModule`.
   - **Ranh giới**: Backend chịu toàn bộ trách nhiệm về tính toán tài chính, kiểm soát tồn kho, bảo vệ máy trạng thái đơn hàng và xác thực JWT.
3. **Cơ sở dữ liệu (PostgreSQL 16 & Prisma ORM)**:
   - Nguồn lưu trữ bền vững (Single Source of Truth).
   - Sử dụng Prisma làm công cụ quản lý cấu trúc bảng, migrations và seeds tự động hóa.
   - Toàn bộ giao dịch tài chính và trừ tồn kho được bảo vệ trong Database Transactions với mức cô lập phù hợp.
4. **Cổng thanh toán giả lập (Mock Payment Gateway)**:
   - Tách biệt thành dịch vụ ngoài. NestJS gọi dịch vụ này mà **không giữ kết nối Database Transaction mở** để tránh cạn kiệt connection pool.

## 3. Hệ quả

- Ranh giới trách nhiệm cực kỳ rõ ràng; mọi request đều được validate bằng `class-validator` và `ValidationPipe` trước khi vào tầng dịch vụ.
- Đảm bảo tính toàn vẹn nghiệp vụ ngay cả khi giao diện client bị tấn công hoặc can thiệp thông số.
