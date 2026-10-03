# Nội dung gói phần mềm

---

## Thông tin gói

- **Tên**: Phần mềm Khai thác Mỏ
- **Phiên bản**: 1.0.0
- **Ngày phát hành**: 02/10/2026
- **Trạng thái**: Ổn định (Production Ready)

---

## Cấu trúc thư mục

```
mining-software/
├── src/
│   └── App.jsx                    # Ứng dụng chính (React)
├── netlify/
│   └── functions/
│       ├── login.js               # Xác thực người dùng
│       ├── kv.js                  # Lưu trữ dữ liệu
│       └── ticket.js              # Cấp số phiếu
├── public/
│   └── [Tài nguyên tĩnh]          # Logo, ảnh (chưa có)
├── docs/
│   ├── README.md                  # Giới thiệu chung
│   ├── QUICK_START.md             # Bắt đầu nhanh (15 phút)
│   ├── INSTALLATION_GUIDE.md      # Cài đặt chi tiết
│   ├── USER_GUIDE.md              # Hướng dẫn sử dụng từng vai trò
│   ├── CONFIGURATION.md           # Hướng dẫn cấu hình
│   └── PACKAGE_CONTENTS.md        # Tài liệu này
├── package.json                   # Danh sách dependencies
├── netlify.toml                   # Cấu hình Netlify
├── .gitignore                     # Cấu hình Git
├── LICENSE                        # Giấy phép
└── CHANGELOG.md                   # Lịch sử phiên bản
```

---

## Chi tiết từng file

### Tệp ứng dụng

#### `src/App.jsx` (382 KB)
**Mô tả**: Ứng dụng React chính, chứa:
- Giao diện người dùng cho 7 vai trò
- Logic xử lý dữ liệu
- Quản lý trạng thái (state)
- Nhập/xuất báo cáo

**Yêu cầu sửa đổi**: 
- Tên mỏ / công ty (dòng 55-90)
- Danh sách máy xúc, lái máy, khách hàng
- Tùy chỉnh giao diện

---

### Netlify Functions (Máy chủ)

#### `netlify/functions/login.js` (3 KB)
**Mô tả**: Xác thực người dùng
- Đăng nhập / đăng xuất
- Quản lý phiên (session)
- Kiểm tra quyền truy cập

**Cấu hình**:
- Tài khoản mặc định (dòng 10-16)
- Thời gian hết hạn phiên (30 ngày)

#### `netlify/functions/kv.js` (2 KB)
**Mô tả**: Lưu trữ và truy vấn dữ liệu
- Đọc/ghi sự kiện
- Đọc/ghi cấu hình
- Xác thực người dùng

**Sử dụng**: Netlify Blobs (lưu trữ đám mây)

#### `netlify/functions/ticket.js` (4 KB)
**Mô tả**: Cấp số phiếu duy nhất
- Ngăn chặn trùng số phiếu
- Xử lý yêu cầu song song
- Sử dụng @netlify/blobs v11.1.1

**Khả năng**: Hỗ trợ 60+ máy xúc cùng xác nhận

---

### Tài liệu

#### `README.md` (8 KB)
**Mô tả**: Trang chủ tài liệu
- Giới thiệu phần mềm
- Liệt kê các tính năng chính
- Các vai trò người dùng
- Yêu cầu hệ thống

**Đọc**: Trước tiên

#### `docs/QUICK_START.md` (1 KB)
**Mô tả**: Hướng dẫn nhanh (15 phút)
- 5 bước triển khai
- Lệnh căn bản
- Kiểm thử nhanh

**Đọc**: Nếu cần cài đặt nhanh

#### `docs/INSTALLATION_GUIDE.md` (12 KB)
**Mô tả**: Hướng dẫn cài đặt chi tiết
- Yêu cầu kỹ thuật
- Chuẩn bị môi trường (Node.js, npm)
- Cài đặt từng bước
- Triển khai trên Netlify
- Cấu hình miền (domain)
- Kiểm thử chức năng
- Xử lý sự cố

**Đọc**: Trước khi triển khai

#### `docs/USER_GUIDE.md` (25 KB)
**Mô tả**: Hướng dẫn sử dụng từng vai trò
- Đăng nhập
- Bảo vệ cổng (ghi xe vào/ra)
- Kỹ thuật (ghi khối lượng)
- Lái máy xúc (xác nhận xúc đầy)
- Kế toán (in phiếu)
- Giám đốc (xem dashboard)
- Kế toán công ty (báo cáo)
- Ban lãnh đạo (xem báo cáo)
- Xử lý sự cố thường gặp

**Đọc**: Hướng dẫn cho nhân viên

#### `docs/CONFIGURATION.md` (20 KB)
**Mô tả**: Hướng dẫn cấu hình
- Tên mỏ / công ty
- Loại xe, máy xúc, lái máy
- Khách hàng, đơn giá
- Cảnh báo công nợ
- Kế hoạch khai thác
- Tài khoản người dùng
- Cấu hình Netlify Functions

**Đọc**: Trước khi bắt đầu sử dụng

---

### Cấu hình

#### `package.json` (1 KB)
**Mô tả**: Danh sách dependencies
- React 18.3.1
- Recharts (biểu đồ)
- XLSX (xuất Excel)
- Tailwind CSS (styling)
- Netlify Blobs (lưu trữ)

**Cập nhật**: `npm install` tự động tải

#### `netlify.toml` (0.5 KB)
**Mô tả**: Cấu hình triển khai Netlify
- Lệnh build
- Thư mục functions
- Thư mục publish

**Sửa đổi**: Ít khi cần

#### `.gitignore` (0.5 KB)
**Mô tả**: Tệp không đưa lên Git
- node_modules/
- .env
- dist/
- Tệp tạm

**Sử dụng**: Nếu sử dụng Git

---

### Giấy phép

#### `LICENSE` (1 KB)
**Mô tả**: Giấy phép MIT
- Sử dụng miễn phí
- Có thể sửa đổi
- Có thể phân phối

**Điều kiện**: Giữ thông tin copyright

#### `CHANGELOG.md` (tuỳ chọn)
**Mô tả**: Lịch sử phiên bản
- Các thay đổi mỗi phiên bản
- Tính năng mới
- Sửa lỗi

---

## Kích thước gói

- **Mã nguồn**: ~400 KB
- **Dependencies (npm)**: ~200 MB (cài đặt lần đầu)
- **Build output**: ~500 KB
- **Tài liệu**: ~70 KB

**Tổng cộng**: ~1.2 GB (bao gồm node_modules)

---

## Phiên bản Dependencies chính

| Gói | Phiên bản | Mục đích |
|-----|----------|---------|
| React | 18.3.1 | Framework giao diện |
| react-dom | 18.3.1 | Render React |
| Recharts | 2.12.0 | Biểu đồ thống kê |
| XLSX | 0.18.5 | Xuất Excel |
| Tailwind CSS | 3.4.0 | Styling |
| lucide-react | 0.408.0 | Biểu tượng |
| @netlify/blobs | 11.1.1 | Lưu trữ đám mây |

---

## Chức năng chính được cài đặt

✅ **Quản lý xe**
- Ghi nhận vào/ra cổng
- Xử lý xe lặp lại (camera ghi 2 lần)

✅ **Ghi nhận khối lượng**
- Tính từ kích thước (Dài × Rộng × Cao)
- Hỗ trợ khối lượng ngọn

✅ **Quản lý máy xúc**
- Gán máy xúc, lái máy
- Xác nhận xúc đầy

✅ **Lập phiếu xuất**
- Tự động khi xác nhận xúc
- 3 liên: Kế toán, khách hàng, lái xe
- In khổ 80mm

✅ **Báo cáo tài chính**
- Công nợ theo khách hàng
- Doanh thu theo ngày
- Cảnh báo vàng/đỏ

✅ **Kiểm soát quyền**
- 7 vai trò (Bảo vệ, Kỹ thuật, Lái xúc, Kế toán, Giám đốc, Kế toán công ty, Ban lãnh đạo)
- Phiên 30 ngày
- Token xác thực

---

## Những gì KHÔNG được cài đặt (Cần triển khai riêng)

❌ **Miền (domain)**
- Cần mua riêng (VD: khaimon.vn)
- Hoặc sử dụng miền Netlify miễn phí

❌ **Logo công ty**
- Cần tạo file `public/logo.jpg`
- Hoặc sửa App.jsx để sử dụng logo khác

❌ **Email hỗ trợ**
- Cần cấu hình email server riêng
- Tài liệu không bao gồm chức năng email

❌ **Sao lưu tự động**
- Cần cấu hình thêm (backup script)
- Tài liệu hướng dẫn thủ công

---

## Bảo mật

**Đã cài sẵn**:
- ✅ SSL/HTTPS tự động (Netlify)
- ✅ Xác thực người dùng
- ✅ Token Bearer cho API
- ✅ Session timeout 30 ngày
- ✅ Kiểm soát quyền (role-based)

**Cần làm sau triển khai**:
- ⚠️ Thay đổi tất cả mật khẩu mặc định
- ⚠️ Bật 2-Factor Authentication (2FA) trên Netlify
- ⚠️ Sao lưu dữ liệu hàng tuần
- ⚠️ Kiểm tra nhật ký truy cập

---

## Hỗ trợ

Nếu gặp vấn đề:

1. **Xem tài liệu**: docs/ folder
2. **Xem QUICK_START.md**: Nếu là lần đầu
3. **Xem INSTALLATION_GUIDE.md**: Nếu cài đặt thất bại
4. **Xem USER_GUIDE.md**: Nếu không biết cách dùng

---

## Phiên bản tương lai

Các tính năng dự kiến thêm:
- Tích hợp camera (nhận diện biển số)
- Báo cáo PDF tự động
- Tính năng mobile app
- Tích hợp ngân hàng (thanh toán)
- Quản lý kho xúp

---

**Phát hành**: 02/10/2026

**Nhà phát triển**: Phần mềm Khai thác Mỏ Team

**Liên hệ**: support@[domain].vn
