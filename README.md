# Phần mềm Khai thác Mỏ

**Phiên bản:** 1.0.0

**Ngôn ngữ:** Tiếng Việt

**Nền tảng:** Web (React + Netlify Functions)

---

## Giới thiệu

Phần mềm Khai thác Mỏ là một giải pháp quản lý toàn diện cho các hoạt động khai thác khoáng sản. Phần mềm hỗ trợ:

- **Quản lý phương tiện**: Theo dõi các xe vận chuyển vào/ra mỏ bằng hệ thống cổng tự động
- **Ghi nhận khối lượng**: Kỹ thuật ghi nhận kích thước, khối lượng hàng hóa từng xe
- **Điều phối máy xúc**: Quản lý các máy xúc và lái máy, xác nhận xúc hàng
- **Quản lý khách hàng**: Theo dõi công nợ, tính giá theo khách hàng
- **Lập phiếu xuất**: Tự động lập phiếu xuất đất khi xác nhận xúc đầy
- **Báo cáo tài chính**: Tổng hợp doanh thu, công nợ theo khách hàng
- **Kiểm soát quyền**: Phân chia quyền hạn theo vai trò người dùng

---

## Các vai trò người dùng

Phần mềm định nghĩa 7 vai trò chính:

### 1. **Bảo vệ cổng** (Bảo Vệ)
- Ghi nhận xe vào/ra cổng
- Xem danh sách xe hiện có trong mỏ
- Kiểm tra biển số và giờ vào

### 2. **Kỹ thuật** (Kỹ Thuật)
- Ghi nhận kích thước xe (Dài × Rộng × Cao)
- Nhập khối lượng hàng hóa
- Chọn loại xe, khách hàng
- Xem danh sách xe cần ghi nhận

### 3. **Lái máy xúc** (Lái Xúc)
- Xác nhận xe đã xúc đầy hàng
- Chọn máy xúc và lái máy
- Xem danh sách xe trong mỏ
- Tự động lập phiếu xuất khi xúc đầy

### 4. **Kế toán mỏ** (Kế Toán)
- Xem phiếu xuất (3 liên)
- In phiếu theo khổ giấy 80mm
- Xem báo cáo công nợ khách hàng

### 5. **Giám đốc mỏ** (Giám Đốc)
- Dashboard toàn cảnh hoạt động ngày
- Xem số lượng xe, khối lượng đưa ra
- Xem công nợ khách hàng

### 6. **Kế toán công ty** (Kế Toán Công Ty)
- Báo cáo công nợ cả công ty
- Xem doanh thu theo mỏ
- Tra soát tất cả phiếu xuất

### 7. **Ban lãnh đạo** (Ban Lãnh Đạo)
- Xem báo cáo tổng hợp (chỉ xem)
- Kiểm soát kế hoạch khai thác năm

---

## Quy trình làm việc tiêu chuẩn

### Quy trình xúc hàng (1 chuyến)

```
1. Bảo vệ ghi nhận  →  2. Kỹ thuật ghi nhận  →  3. Lái xúc xác nhận
   (Xe vào cổng)       (Kích thước, khối lượng)   (Xúc đầy hàng)
                                                           ↓
                                                    Phiếu xuất tự động
                                                           ↓
                                                    Kế toán in phiếu
```

### Thời gian xử lý

- Thông thường: 5-10 phút từ vào đến xúc đầy
- Phiếu xuất: Tự động khi lái xúc bấm "Xúc đầy"
- In phiếu: Ngay lập tức sau khi xác nhận

---

## Yêu cầu hệ thống

### Phía khách (Frontend)
- Trình duyệt: Chrome, Firefox, Safari, Edge (phiên bản mới)
- Kết nối Internet: 2G/3G/4G (ít nhất 256 Kbps)
- Thiết bị: Máy tính, tablet, điện thoại
- Bản cập nhật: Tự động (không cần cài đặt)

### Phía máy chủ (Backend)
- Nền tảng: Netlify Functions
- Lưu trữ: Netlify Blobs
- Khả năng xử lý: Tối đa 200 yêu cầu/giây
- Thời gian phản hồi: Dưới 500ms

---

## Cài đặt và triển khai

Xem tài liệu chi tiết: **`docs/INSTALLATION_GUIDE.md`**

Các bước cơ bản:

```bash
# 1. Clone hoặc tải mã nguồn
git clone <repository> mining-software
cd mining-software

# 2. Cài đặt dependencies
npm install

# 3. Tạo tài khoản Netlify và liên kết project
netlify login
netlify link

# 4. Triển khai
npm run build
netlify deploy
```

---

## Cấu hình

Xem tài liệu chi tiết: **`docs/CONFIGURATION.md`**

Các thông số chính cần cấu hình:

- **Tên mỏ / công ty**: Hiển thị trên phiếu xuất
- **Danh sách máy xúc**: ID và tên từng máy
- **Danh sách lái máy**: ID và tên lái
- **Khách hàng**: Tên, đơn giá
- **Cảnh báo công nợ**: Mức vàng, mức đỏ

---

## Tài liệu

| Tài liệu | Mô tả |
|---------|-------|
| `docs/USER_GUIDE.md` | Hướng dẫn chi tiết cho mỗi vai trò |
| `docs/INSTALLATION_GUIDE.md` | Cài đặt và triển khai |
| `docs/CONFIGURATION.md` | Cấu hình hệ thống |
| `docs/API_DOCUMENTATION.md` | Tài liệu API Netlify |
| `docs/TROUBLESHOOTING.md` | Xử lý sự cố thường gặp |

---

## Các tính năng chính

### ✅ Quản lý xe
- Theo dõi thời gian vào/ra
- Ghi nhận biển số tự động (hoặc thủ công)
- Xử lý xe vào lặp lại (camera ghi nhận 2 lần)

### ✅ Ghi nhận khối lượng
- Nhập kích thước (Dài × Rộng × Cao)
- Tính khối lượng tự động (m³)
- Nhập khối lượng cộng thêm do ngọn
- Lịch sử chỉnh sửa

### ✅ Lập phiếu xuất
- Tự động khi xác nhận xúc đầy
- 3 liên: Kế toán, khách hàng, lái xe
- In được ngay trên máy in 80mm

### ✅ Báo cáo tài chính
- Công nợ theo khách hàng
- Doanh thu theo ngày/tuần/tháng
- Theo dõi thanh toán

### ✅ Kiểm soát quyền
- 7 vai trò, mỗi vai trò có quyền riêng
- Phiên đăng nhập: 30 ngày
- Tự động đăng xuất khi hết hạn

---

## Hỗ trợ và liên hệ

- **Trang chủ**: www.khaiThacMo.vn (tuỳ chỉnh)
- **Email hỗ trợ**: support@khaiThacMo.vn (tuỳ chỉnh)
- **Hotline**: +84 (tuỳ chỉnh)

---

## Giấy phép

Phần mềm này được cấp phép cho các hoạt động khai thác khoáng sản có pháp lý.

**Ngày phát hành:** 02 tháng 10 năm 2026

**Phiên bản:** 1.0.0 (Phiên bản ổn định)
