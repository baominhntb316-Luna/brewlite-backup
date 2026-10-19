# ADR-004: Kiểm Soát Tồn Kho Khi Đặt Đồng Thời (Inventory Concurrency Control)

> **Trạng thái**: Đã chấp thuận (Accepted)  
> **Ngày quyết định**: 2026-10-19  
> **Căn cứ**: Đề bài Assignment 2 – Mục 4.1.4 (ADR-006) & Mục 6.1.2 (Task 1.2 FR-13 & Task 5.1)

---

## 1. Bối cảnh và Đặt vấn đề

Khi quán cà phê chạy chương trình khuyến mãi hoặc vào khung giờ cao điểm, nhiều khách hàng có thể cùng lúc đặt mua một món đồ uống có số lượng nguyên liệu/tồn kho giới hạn.
Nếu áp dụng phương pháp ngây thơ:
```sql
-- SAI: Dẫn đến Race Condition (Lost Update)
SELECT stock FROM Product WHERE id = :id;
-- Ứng dụng kiểm tra if (stock >= qty)
INSERT INTO "Order" ...;
UPDATE Product SET stock = stock - :qty WHERE id = :id;
```
Hai luồng thực thi đồng thời đọc cùng giá trị tồn kho sẽ cùng cho rằng còn hàng, dẫn đến bán vượt tồn kho và số lượng tồn bị âm trong CSDL ($stock < 0$).

## 2. Quyết định (Decision)

Áp dụng phương pháp **Atomic Conditional Update** bên trong một **Database Transaction** duy nhất:

```sql
BEGIN;

-- Cập nhật có điều kiện trực tiếp tại tầng CSDL
UPDATE "Product"
SET stock = stock - :qty,
    stockVersion = stockVersion + 1
WHERE id = :productId
  AND isActive = TRUE
  AND stock >= :qty;

-- Ứng dụng kiểm tra số dòng bị tác động (Affected Rows):
-- Nếu affected_rows === 0: ROLLBACK và ném lỗi 409 OUT_OF_STOCK.

INSERT INTO "Order" (id, userId, status, total) VALUES (:orderId, :userId, 'PENDING', :serverTotal);
INSERT INTO "OrderItem" (...);

COMMIT;
```

## 3. Lý do lựa chọn và Đánh đổi

1. **Hiệu năng cao**: Tận dụng cơ chế khóa mức hàng (Row-level lock) tích hợp sẵn của PostgreSQL, không yêu cầu thiết lập hệ thống phân tán Redis Lock phức tạp.
2. **An toàn tuyệt đối**: Đảm bảo điều kiện bất biến $stock \ge 0$ luôn được bảo vệ ở cấp độ CSDL.
3. **Đánh đổi**: Khi xảy ra tranh chấp gay gắt, một số khách hàng sẽ nhận mã lỗi `409 Conflict`. Giao diện Next.js được thiết kế để đón nhận lỗi này và hướng dẫn khách hàng chọn món khác mà không làm mất các món khác trong giỏ hàng.
