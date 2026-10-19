# BrewLite – Cashless Coffee Ordering System

[![CI Quality Gate](https://github.com/baominhntb316-Luna/brewlite/actions/workflows/ci.yml/badge.svg)](https://github.com/baominhntb316-Luna/brewlite/actions/workflows/ci.yml)
![Node](https://img.shields.io/badge/node-%3E%3D22.0.0-green.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.x-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14%2B-black.svg)
![NestJS](https://img.shields.io/badge/NestJS-10%2B-red.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg)
![Docker](https://img.shields.io/badge/docker-compose-blue.svg)

> **Môn học**: Công nghệ Phần mềm  
> **Học kỳ**: I – Năm học 2026–2027  
> **Đơn vị**: Khoa Công nghệ Thông tin – Trường Đại học Sài Gòn  
> **Đồ án**: Bài tập lớn Assignment 2 – Requirements to Deployment (VER 1.0)

---

## 1. Tổng quan dự án

BrewLite là ứng dụng web đặt cà phê và đồ uống không dùng tiền mặt, thiết kế theo định hướng mobile-first/PWA, giúp khách hàng xem thực đơn, tùy chỉnh size/topping, quản lý giỏ hàng, đặt hàng và thanh toán nhanh chóng chỉ qua vài thao tác chạm trên điện thoại di động.

### Luồng nghiệp vụ cốt lõi (End-to-End Flow)
```
Xem menu ──> Chọn tùy chọn (Size/Topping) ──> Giỏ hàng ──> Đăng nhập / Đặt đơn ──> Thanh toán mock (Ví/Thẻ) ──> Theo dõi đơn & Lịch sử
```

### Công nghệ cốt lõi
- **Frontend**: Next.js 14+ (App Router, React, TypeScript), Tailwind CSS, Mobile-first UI & PWA-ready.
- **Backend**: NestJS (TypeScript), kiến trúc Modular Monolith phân tầng (Domain-driven modules), `class-validator`, Passport JWT.
- **Cơ sở dữ liệu**: PostgreSQL 16, Prisma ORM với Migration và Seed dữ liệu chuẩn.
- **Thanh toán mô phỏng**: Mock Payment Service (hỗ trợ kiểm thử trạng thái SUCCESS, FAILURE, TIMEOUT và cơ chế Idempotency chống lặp giao dịch).
- **CI/CD & DevOps**: GitHub Actions, Docker Compose, GHCR (GitHub Packages), Caddy Reverse Proxy (HTTPS/TLS tự động).

---

## 2. Cấu trúc thư mục Monorepo

```
brewlite/
├── apps/
│   ├── web/                         # Next.js frontend (mobile-first / PWA)
│   │   ├── app/                     # Next.js App Router (Menu, Cart, Checkout)
│   │   ├── components/              # UI components (ProductCard, Skeleton, Error, Empty)
│   │   ├── types/                   # TypeScript interfaces / DTOs
│   │   └── __tests__/               # Unit & Component tests
│   └── api/                         # NestJS REST API backend
│       ├── src/
│       │   ├── health/              # Health check module (GET /health)
│       │   ├── products/            # Products domain module (GET /products, GET /products/:id)
│       │   │   ├── dto/             # Request / Response validation DTOs
│       │   │   └── seed/            # Seed data tái tạo menu mẫu
│       │   ├── app.module.ts        # Root module
│       │   └── main.ts              # Entrypoint (CORS, ValidationPipe, Global filters)
│       └── test/                    # Unit tests & API spec
├── docs/                            # Tài liệu kỹ thuật bắt buộc theo thứ tự cổng nghiệm thu
│   ├── requirements/                # Task 1: Bối cảnh, SRS (FR/NFR), Use Case (UC-05)
│   ├── diagrams/                    # Task 2 & 3: File nguồn .puml & bản xuất SVG
│   │   └── exports/                 # Bản xuất SVG chính thức của các sơ đồ
│   ├── architecture/                # Task 3: Mô tả kiến trúc và các bản ghi quyết định ADR
│   │   └── adr/                     # ADR-001 đến ADR-004
│   ├── traceability-matrix.md       # Task 7 & Task 8: Ma trận truy vết yêu cầu (Traceability)
│   └── deployment.md                # Task 3.2 & Task 5: Kế hoạch triển khai & vận hành
├── tests/                           # Integration & End-to-End tests
│   ├── integration/
│   └── e2e/
├── .github/workflows/               # Task 4.4 & Task 5.3: Pipeline CI và CD tự động
│   ├── ci.yml                       # CI Quality Gate (Install -> Lint -> Test -> Build)
│   └── cd.yml                       # CD Deployment pipeline
├── docker-compose.yml               # Cấu hình container local (Web, API, PostgreSQL)
├── .env.example                     # Mẫu biến môi trường (không chứa secret thật)
├── .gitignore                       # Loại trừ node_modules, build artifacts, secrets
└── README.md                        # Tài liệu hướng dẫn sử dụng và kiểm thử
```

---

## 3. Yêu cầu môi trường & Cài đặt

### Yêu cầu tiên quyết
- **Node.js**: Phiên bản `>= 20.0.0` (khuyến nghị Node.js 22 LTS).
- **npm**: Phiên bản `>= 10.0.0`.
- **Docker & Docker Compose** (nếu chạy qua container).
- **Git**: `>= 2.40.0`.

### Cấu hình biến môi trường
Tạo file `.env` từ file mẫu `.env.example`:
```bash
# Tại thư mục gốc của repository
cp .env.example .env
```

Nội dung cấu hình mẫu trong `.env`:
| Tên biến | Mục đích | Giá trị mặc định (Local) |
|---|---|---|
| `NODE_ENV` | Môi trường thực thi | `development` |
| `API_PORT` | Cổng dịch vụ NestJS | `3001` |
| `JWT_SECRET` | Khóa bí mật ký mã token | `replace-with-local-dev-secret-at-least-32-chars` |
| `JWT_EXPIRES_IN` | Thời gian sống token | `1h` |
| `PAYMENT_MOCK_MODE` | Chế độ giả lập thanh toán | `success` (hoặc `failure`) |
| `POSTGRES_DB` | Tên cơ sở dữ liệu | `brewlite` |
| `POSTGRES_USER` | Tên người dùng CSDL | `brewlite` |
| `POSTGRES_PASSWORD`| Mật khẩu CSDL | `replace-local-password` |
| `DATABASE_URL` | Chuỗi kết nối DB | `postgresql://brewlite:replace-local-password@localhost:5432/brewlite?schema=public` |
| `NEXT_PUBLIC_API_BASE_URL` | Base URL gọi API từ browser | `http://localhost:3001` |

---

## 4. Hướng dẫn khởi chạy

### Cách 1: Khởi chạy trực tiếp (Local Development)

#### Bước 1: Khởi chạy Backend API (NestJS)
```bash
cd apps/api
npm install
npm run start:dev
```
Backend API sẽ khởi động tại: `http://localhost:3001`  
Kiểm tra Health check: `http://localhost:3001/health`  
Kiểm tra danh sách Menu: `http://localhost:3001/products`

#### Bước 2: Khởi chạy Frontend Web (Next.js)
```bash
cd apps/web
npm install
npm run dev
```
Giao diện ứng dụng sẽ sẵn sàng tại: `http://localhost:3000`

---

### Cách 2: Khởi chạy toàn bộ hệ thống bằng Docker Compose

Chỉ cần một câu lệnh duy nhất tại thư mục gốc để khởi động CSDL PostgreSQL, API và Frontend Web:
```bash
docker compose up --build
```
Dịch vụ sẽ tự động chờ DB healthy trước khi khởi chạy API, và API healthy trước khi khởi chạy Web:
- **Web Client**: `http://localhost:3000`
- **REST API**: `http://localhost:3001`
- **Health Check**: `http://localhost:3001/health`

Dừng hệ thống:
```bash
docker compose down
```

---

## 5. Quy trình Kiểm thử (Testing) & Quality Gate

Dự án áp dụng quy chuẩn kiểm thử nghiêm ngặt tại cả 2 tầng Frontend và Backend:

### Chạy kiểm thử cho Backend API (`apps/api`):
```bash
cd apps/api
npm run lint          # Kiểm tra chuẩn cú pháp ESLint
npm test              # Chạy toàn bộ Unit tests cho Controller, Service, Health
npm run build         # Biên dịch mã nguồn TypeScript sang dist/
```

### Chạy kiểm thử cho Frontend Web (`apps/web`):
```bash
cd apps/web
npm run lint          # Kiểm tra cú pháp Next.js / React
npm test              # Chạy component tests (Loading, Empty, Error, Product render)
npm run build         # Build production bundle (.next)
```

---

## 6. API Endpoints cốt lõi (Sprint 1 MVP)

| Phương thức | Đường dẫn | Phân quyền | Mô tả chức năng |
|---|---|---|---|
| `GET` | `/health` | Public | Kiểm tra trạng thái hoạt động của hệ thống (liveness check) |
| `GET` | `/products` | Public | Lấy danh sách sản phẩm đồ uống đang active (có id, name, price, stock, variants, toppings) |
| `GET` | `/products/:id` | Public | Lấy thông tin chi tiết một sản phẩm đồ uống (trả về 404 nếu không tìm thấy) |

### Dữ liệu mẫu (Sample Response `GET /products`):
```json
[
  {
    "id": "coffee-milk",
    "name": "Cà phê sữa",
    "basePrice": 35000,
    "imageUrl": "/images/coffee-milk.jpg",
    "stock": 25,
    "isActive": true,
    "variants": [
      { "size": "S", "priceDelta": 0 },
      { "size": "M", "priceDelta": 6000 },
      { "size": "L", "priceDelta": 10000 }
    ],
    "toppings": [
      { "id": "pearl", "name": "Trân châu đen", "extraPrice": 5000 },
      { "id": "cheese-foam", "name": "Kem phô mai", "extraPrice": 8000 }
    ]
  }
]
```

---

## 7. Quy chuẩn Git & Tiêu chí hoàn thành (Definition of Done)

### Quy ước Branch & Pull Request
- Nhánh chính `main` được bảo vệ (Protected Branch). Tuyệt đối không commit trực tiếp lên `main`.
- Quy chuẩn nhánh tính năng: `feature/<issue-id>-<short-description>`, ví dụ: `feature/TASK-03-menu-page`.
- Quy chuẩn nhánh sửa lỗi: `fix/<issue-id>-<short-description>`.
- Mỗi Pull Request bắt buộc phải:
  1. Vượt qua 100% Quality Gate của CI (Install, Lint, Unit Test, Build).
  2. Được ít nhất 1 thành viên trong nhóm rà soát (Code Review) và phê duyệt (Approve).
  3. Mô tả rõ phạm vi thay đổi và đính kèm bằng chứng kiểm thử.

### Quy ước Commit (Conventional Commits)
- `feat(scope)`: Thêm tính năng mới (vd: `feat(api): add products module`).
- `fix(scope)`: Sửa lỗi (vd: `fix(web): handle image fallback on error`).
- `test(scope)`: Bổ sung hoặc cập nhật kiểm thử (vd: `test(api): add products service unit test`).
- `docs(scope)`: Cập nhật tài liệu kỹ thuật, sơ đồ (vd: `docs(srs): add acceptance criteria for FR-01`).
- `ci(scope)`: Cập nhật cấu hình CI/CD (vd: `ci(github): add matrix check for web and api`).
- `chore(scope)`: Cấu hình dependencies, công cụ (vd: `chore(deps): update nextjs to 14.2`).

### Tiêu chuẩn hoàn thành (Definition of Done - DoD)
Một task hoặc User Story chỉ được chuyển sang trạng thái **Done** khi:
1. Mã nguồn build thành công, không phát sinh lỗi Lint hoặc Compile.
2. Đã viết kiểm thử tự động (Unit / Component test) và tất cả test đều PASS.
3. Đáp ứng 100% Tiêu chí chấp nhận (Acceptance Criteria) đã thỏa thuận trong Backlog.
4. Giao diện người dùng xử lý đầy đủ 3 trạng thái: **Loading**, **Empty** và **Error**.
5. Tài liệu liên quan (SRS, Diagrams, Ma trận truy vết) được cập nhật đồng bộ trong cùng PR.
6. PR được review và merge vào `main` sau khi CI kiểm tra đạt kết quả XANH.

---

## 8. Thông tin Bàn giao & Triển khai Production

- **URL Web Production**: `https://brewlite.example.com` *(được cấu hình qua reverse proxy Caddy HTTPS)*
- **URL API Production**: `https://brewlite.example.com/api`
- **URL Health check**: `https://brewlite.example.com/health`
- **Container Registry**: GitHub Container Registry (`ghcr.io`)
- **Kho lưu trữ chính thức**: [https://github.com/baominhntb316-Luna/brewlite](https://github.com/baominhntb316-Luna/brewlite)
