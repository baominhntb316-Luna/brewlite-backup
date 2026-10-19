# ADR-001: Lựa Chọn Cấu Trúc Monorepo Cho Toàn Bộ Dự Án BrewLite

> **Trạng thái**: Đã chấp thuận (Accepted)  
> **Ngày quyết định**: 2026-10-19  
> **Người quyết định**: Đội ngũ phát triển BrewLite  
> **Căn cứ**: Đề bài Assignment 2 – Mục 4.1.4 (Task 3.1 & Task 4.1)

---

## 1. Bối cảnh và Đặt vấn đề

Hệ thống BrewLite bao gồm hai ứng dụng độc lập: Frontend web (Next.js) và Backend REST API (NestJS), cùng hệ thống tài liệu phân tích thiết kế (Docs), sơ đồ UML, các bài kiểm thử tích hợp/E2E và cấu hình hạ tầng (Docker, GitHub Actions).
Nhóm cần đưa ra quyết định về cấu trúc lưu trữ mã nguồn:
- **Phương án A (Multi-repo)**: Tạo các repository riêng biệt cho `brewlite-web`, `brewlite-api`, `brewlite-docs`.
- **Phương án B (Monorepo)**: Tập trung tất cả vào một kho lưu trữ duy nhất với cấu trúc thư mục phân tách rõ ràng (`apps/web`, `apps/api`, `docs/`, `tests/`).

## 2. Quyết định (Decision)

Nhóm quyết định áp dụng mô hình **Monorepo** với cấu trúc thư mục quy định như sau:
```
brewlite/
├── apps/
│   ├── web/
│   └── api/
├── docs/
│   ├── requirements/
│   ├── diagrams/
│   └── architecture/
├── tests/
├── .github/workflows/
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

## 3. Lý do lựa chọn (Rationale)

1. **Tuân thủ quy tắc truy vết và cổng nghiệm thu của Assignment 2**: Đề bài yêu cầu nghiêm ngặt việc liên kết một-một từ Yêu cầu -> Sơ đồ -> API/Code -> Kiểm thử. Khi lưu chung trong một repo, mỗi Pull Request có thể cập nhật đồng bộ mã nguồn, tài liệu và sơ đồ trong cùng một Commit, đảm bảo lịch sử phiên bản nhất quán.
2. **Đơn giản hóa cấu hình CI/CD và Docker Compose**: Tệp `docker-compose.yml` ở thư mục gốc có thể trực tiếp liên kết các container `web`, `api`, `db` mà không cần clone nhiều repo phụ. Pipeline CI (`.github/workflows/ci.yml`) dễ dàng kiểm tra cả hai ứng dụng trong một lần push.
3. **Thống nhất chia sẻ DTO và Hợp đồng API (API Contracts)**: Giảm thiểu sai lệch dữ liệu giữa client và server.

## 4. Hệ quả và Đánh đổi (Consequences & Trade-offs)

- **Ưu điểm**: Quản lý phiên bản tập trung, thuận tiện cho giảng viên review toàn diện mã nguồn và tài liệu; dễ dàng chạy hệ thống chỉ với một câu lệnh.
- **Thách thức**: Cần cấu hình đường dẫn làm việc (`working-directory: apps/web` và `apps/api`) rõ ràng trong GitHub Actions để CI chạy đúng thư mục và cache dependencies độc lập.
