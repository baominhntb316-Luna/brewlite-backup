# BrewLite – Kế Hoạch Triển Khai và Vận Hành Production (Deployment Plan)

> **Mã tạo phẩm**: DOC-DEP-01  
> **Căn cứ**: Đề bài Assignment 2 – Mục 4.2 & Phụ lục B  
> **Nền tảng mục tiêu**: Linux VPS (Ubuntu Server 22.04 LTS), Docker Compose, Caddy Reverse Proxy (Tự động HTTPS / Let's Encrypt), GitHub Container Registry (GHCR).

---

## 1. Kiến trúc Hạ tầng Mạng và Cổng Kết nối (Ports & Network)

| Thành phần / Dịch vụ | Cổng công khai (Host) | Cổng nội bộ (Container) | Ranh giới bảo mật & Cơ chế |
|---|---|---|---|
| **Caddy Reverse Proxy** | `:80`, `:443` | Cổng Host | Điểm tiếp nhận duy nhất từ Internet. Tự động chuyển hướng toàn bộ lưu lượng HTTP `:80` sang HTTPS `:443`. |
| **Next.js Web Frontend** | *Không mở cổng ra ngoài* | `:3000` | Nằm trong mạng riêng `internal` của Docker Compose; Caddy chuyển tiếp các yêu cầu trang web tới `http://web:3000`. |
| **NestJS REST API** | *Không mở cổng ra ngoài* | `:3001` | Nằm trong mạng riêng `internal`; Caddy chuyển tiếp các yêu cầu `/api/*` và `/health` tới `http://api:3001`. |
| **PostgreSQL Database** | *Tuyệt đối CẤM mở ra ngoài* | `:5432` | Nằm trong mạng riêng `internal`; chỉ API container mới có thể kết nối. |

---

## 2. Quản lý Bí mật Môi trường (Secrets Management)

- **Nguyên tắc cốt lõi**: Tuyệt đối không commit tệp chứa thông tin nhạy cảm thật (`.env`) vào kho mã nguồn Git.
- Trên máy chủ Production: Tệp cấu hình môi trường được lưu tại vị trí an toàn (ví dụ: `/etc/brewlite/.env`) với quyền đọc hạn chế (`chmod 600` chỉ thuộc sở hữu của user deploy).
- Trong pipeline CI/CD GitHub Actions: Toàn bộ SSH Private Key, thông tin máy chủ và Secret token được mã hóa an toàn qua **GitHub Actions Secrets**:
  - `DEPLOY_HOST`: Địa chỉ IP máy chủ.
  - `DEPLOY_USER`: Tài khoản SSH với quyền hạn tối thiểu.
  - `DEPLOY_SSH_KEY`: Khóa SSH Private Key.
  - `PRODUCTION_FRONTEND_URL`: URL HTTPS trang web kiểm thử khói.
  - `PRODUCTION_API_HEALTH_URL`: URL HTTPS endpoint `/health`.

---

## 3. Quy trình Triển khai Bất biến (Immutable Deployment Pipeline)

1. **Gắn nhãn (Tagging)**: Mỗi Docker Image được đóng gói và gắn tag bất biến bằng Git Commit SHA (`${{ github.sha }}`) và phiên bản Semantic Versioning (ví dụ: `v1.0.0`).
2. **Quality Gate**: Kiểm tra toàn diện Lint, Unit Tests và Build trước khi kích hoạt quy trình triển khai.
3. **Đẩy Image (Registry Push)**: Đẩy image đã gắn tag lên GitHub Container Registry (`ghcr.io/baominhntb316-luna/brewlite/web` và `api`).
4. **Triển khai máy chủ**:
   ```bash
   # Máy chủ pull đúng tag SHA cụ thể (không dùng tag latest)
   IMAGE_TAG=${COMMIT_SHA} docker compose pull
   # Chạy migration CSDL an toàn
   docker compose run --rm api npm run prisma:migrate:deploy
   # Khởi động lại dịch vụ với downtime tối thiểu
   IMAGE_TAG=${COMMIT_SHA} docker compose up -d --remove-orphans
   ```
5. **Kiểm thử khói (Smoke Test)**:
   ```bash
   curl --fail --silent --show-error "https://brewlite.example.com"
   curl --fail --silent --show-error "https://brewlite.example.com/health"
   ```

---

## 4. Chiến lược Phục hồi và Rollback (Rollback Strategy)

Nếu bài kiểm tra khói sau triển khai thất bại:
1. Giữ nguyên image tag trước đó đang hoạt động ổn định (`KNOWN_GOOD_TAG`).
2. Thực thi lệnh rollback ngay lập tức:
   ```bash
   IMAGE_TAG=${KNOWN_GOOD_TAG} docker compose up -d
   ```
3. Xác minh lại trạng thái `/health`.
4. Ghi nhận log sự cố và gửi thông báo cảnh báo cho nhóm phát triển.
