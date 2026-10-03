# Hướng dẫn cài đặt và triển khai

---

## Mục lục

1. [Yêu cầu trước khi cài đặt](#yêu-cầu-trước-khi-cài-đặt)
2. [Chuẩn bị môi trường](#chuẩn-bị-môi-trường)
3. [Cài đặt ứng dụng](#cài-đặt-ứng-dụng)
4. [Triển khai trên Netlify](#triển-khai-trên-netlify)
5. [Cấu hình miền (Domain)](#cấu-hình-miền-domain)
6. [Kiểm tra và kiểm thử](#kiểm-tra-và-kiểm-thử)
7. [Khởi động hệ thống](#khởi-động-hệ-thống)

---

## Yêu cầu trước khi cài đặt

### Yêu cầu kỹ thuật

- **Node.js**: Phiên bản 16 trở lên
- **npm hoặc yarn**: Trình quản lý gói
- **Git**: Kiểm soát phiên bản (tuỳ chọn)
- **Tài khoản Netlify**: Miễn phí hoặc Pro

### Kiến thức cần thiết

- Làm việc với dòng lệnh (Terminal / Command Prompt)
- Hiểu biết cơ bản về React và Node.js
- Khả năng quản lý tài khoản đám mây

### Thời gian dự kiến

- Cài đặt: 15-20 phút
- Triển khai: 10-15 phút
- Kiểm thử: 30-45 phút
- **Tổng cộng**: 1-2 giờ

---

## Chuẩn bị môi trường

### Bước 1: Cài đặt Node.js

**Windows / macOS / Linux**:
1. Truy cập https://nodejs.org/
2. Tải phiên bản LTS (Long Term Support)
3. Chạy trình cài đặt
4. Theo các bước trên màn hình

**Kiểm tra cài đặt**:
```bash
node --version
npm --version
```

Kết quả mong đợi:
```
v18.17.0 (hoặc cao hơn)
9.6.7 (hoặc cao hơn)
```

### Bước 2: Tạo tài khoản Netlify

1. Truy cập https://www.netlify.com/
2. Bấm **Sign up** (Đăng ký)
3. Chọn phương thức: GitHub, GitLab, hoặc Email
4. Xác minh email
5. Chọn gói: Free (miễn phí) hoặc Pro

**Ghi chú**: Gói Free đủ cho hầu hết mỏ nhỏ-vừa (< 200 phiếu/tháng)

### Bước 3: Tạo kho lưu trữ Git (tuỳ chọn)

Nếu sử dụng GitHub để quản lý mã:

1. Truy cập https://github.com/
2. Đăng nhập hoặc Đăng ký
3. Bấm **New repository** (Kho mới)
4. Đặt tên: `mining-software`
5. Mô tả: `Phần mềm khai thác mỏ`
6. Bấm **Create repository**

---

## Cài đặt ứng dụng

### Bước 1: Tải mã nguồn

**Phương pháp A — Tải file ZIP** (Đơn giản nhất)

1. Tải gói `mining-software-1.0.0.zip` từ nhà cung cấp
2. Giải nén vào thư mục: `C:\mining-software\` (Windows) hoặc `~/mining-software/` (Mac/Linux)
3. Mở Terminal / Command Prompt
4. Chuyển vào thư mục:
   ```bash
   cd mining-software
   ```

**Phương pháp B — Clone từ GitHub**

```bash
git clone https://github.com/your-account/mining-software.git
cd mining-software
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

Đợi quá trình cài đặt hoàn tất (2-5 phút tùy tốc độ Internet).

**Kết quả mong đợi**:
```
added 200+ packages in 2m45s
```

### Bước 3: Kiểm tra cài đặt

```bash
npm run build
```

Nếu thành công, sẽ thấy:
```
✓ built successfully
dist/index.html  ... 85.3 kB
dist/app.js      ... 450.2 kB
```

Nếu lỗi, xem phần **Xử lý sự cố** dưới đây.

---

## Triển khai trên Netlify

### Bước 1: Liên kết Git (nếu sử dụng GitHub)

```bash
netlify login
```

Trình duyệt sẽ mở, yêu cầu bạn đăng nhập vào Netlify. Xác nhận quyền truy cập.

### Bước 2: Liên kết project

```bash
netlify link
```

Chọn:
- **Create & configure a new site**: Tạo site mới
- **Tên site**: `mining-moc-xyz` (thay `xyz` bằng tên mỏ)

### Bước 3: Kiểm tra cấu hình Netlify

Tạo file `netlify.toml` nếu chưa có:

```toml
[build]
command = "npm run build"
functions = "netlify/functions"
publish = "dist"

[build.environment]
NODE_VERSION = "18.17.0"
```

### Bước 4: Triển khai

**Lần đầu**:
```bash
netlify deploy --prod
```

**Các lần sau**: 
```bash
npm run build
netlify deploy --prod
```

**Kết quả mong đợi**:
```
✨  Site is live at: https://mining-moc-xyz.netlify.app/
```

### Cấu hình Netlify Blobs

Phần mềm sử dụng Netlify Blobs để lưu trữ dữ liệu. Cấu hình tự động, nhưng bạn có thể kiểm tra:

1. Đăng nhập vào https://app.netlify.com/
2. Chọn site của bạn
3. Vào **Storage** → **Blobs**
4. Xác nhận 3 kho:
   - `mining-app-main` (dữ liệu chính)
   - `mining-app-tickets` (bộ đếm phiếu)
   - `mining-app-sessions` (phiên đăng nhập)

---

## Cấu hình miền (Domain)

### Tuỳ chọn A — Sử dụng miền Netlify (Free)

Trang web sẽ có địa chỉ: `https://mining-moc-xyz.netlify.app/`

**Ưu điểm**:
- Miễn phí
- Tự động SSL (HTTPS)
- Dễ cài đặt

**Nhược điểm**:
- Địa chỉ dài, khó nhớ
- Không tùy chỉnh

### Tuỳ chọn B — Mua miền riêng

**Mua miền tại**:
- Namecheap.com
- GoDaddy.com
- Domain.com.vn (Việt Nam)
- Các nhà cung cấp khác

**Giá**: 50,000 - 200,000 VNĐ/năm tùy tên miền

**Cài đặt miền riêng trên Netlify**:

1. Đăng nhập Netlify, chọn site
2. Vào **Domain management**
3. Bấm **Add custom domain**
4. Nhập miền: `mining-khaimon.vn` (ví dụ)
5. Netlify sẽ cung cấp **DNS settings**
6. Đăng nhập vào nhà cung cấp miền
7. Cập nhật DNS nameservers theo hướng dẫn Netlify
8. Đợi 24-48 giờ để DNS cập nhật

**Sau khi cài đặt**:
- Trang web: `https://mining-khaimon.vn/`
- Email có thể sử dụng miền này: `info@mining-khaimon.vn`

---

## Kiểm tra và kiểm thử

### Bước 1: Mở ứng dụng

Truy cập: `https://mining-moc-xyz.netlify.app/` (hoặc miền riêng của bạn)

Nếu thấy **màn hình đăng nhập**, việc triển khai thành công ✅

### Bước 2: Kiểm thử đăng nhập

Sử dụng tài khoản mặc định (xem `netlify/functions/login.js`):

```
Tên đăng nhập: baove
Mật khẩu: baove123
```

Nếu đăng nhập được, ghi chú:
- ✅ Xác thực hoạt động
- ✅ Netlify Functions hoạt động

### Bước 3: Kiểm thử lưu trữ

Đăng nhập bằng tài khoản `kythuat` / `kythuat123`:

1. Chọn 1 xe từ danh sách
2. Nhập kích thước, khối lượng
3. Bấm **Xác nhận**

Nếu dữ liệu được lưu:
- ✅ Netlify Blobs hoạt động
- ✅ Ứng dụng hoạt động đầy đủ

### Bước 4: Kiểm thử in phiếu

Đăng nhập bằng `ketoan` / `ketoan123`:

1. Tìm phiếu trong danh sách
2. Bấm **In phiếu**
3. Bấm **In** trong cửa sổ trình duyệt

Nếu phiếu in được:
- ✅ Chức năng in hoạt động

---

## Khởi động hệ thống

### Chuẩn bị dữ liệu ban đầu

Trước khi nhân viên bắt đầu dùng, cần cấu hình:

1. **Danh sách máy xúc** (5-20 máy)
2. **Danh sách lái máy** (10-30 người)
3. **Danh sách khách hàng** (5-20 khách)
4. **Loại xe** (thường 3-5 loại)
5. **Tài khoản người dùng** (7 vai trò)

Xem **Hướng dẫn cấu hình** (Configuration Guide) để biết chi tiết.

### Đặt lại mật khẩu tất cả tài khoản

**Bước 1**: Cấp mật khẩu tạm thời cho từng người:

```
Bảo vệ:         baove / [mật khẩu tạm]
Kỹ thuật:       kythuat / [mật khẩu tạm]
Lái máy xúc:    laixuc / [mật khẩu tạm]
Kế toán:        ketoan / [mật khẩu tạm]
Giám đốc:       giamdoc / [mật khẩu tạm]
```

**Bước 2**: Hướng dẫn từng người đăng nhập lần đầu

**Bước 3**: Mỗi người nên đặt mật khẩu của riêng họ ngay lần đầu

### Huấn luyện nhân viên

Dành 1-2 giờ để huấn luyện mỗi vai trò:

**Bảo vệ cổng** (30 phút):
- Ghi nhận xe vào
- Ghi nhận xe ra
- Xử lý lỗi camera

**Kỹ thuật** (30 phút):
- Ghi nhận kích thước
- Nhập khối lượng
- Chọn khách hàng

**Lái máy xúc** (20 phút):
- Xác nhận xúc đầy
- Xem phiếu xuất

**Kế toán** (20 phút):
- In phiếu
- Xem báo cáo

**Giám đốc** (15 phút):
- Xem dashboard

---

## Xử lý sự cố

### Lỗi cài đặt

**"npm: command not found"**
- Cài đặt Node.js chưa được
- Khởi động lại Terminal

**"Cannot find module..."**
- Chạy `npm install` lại
- Xóa thư mục `node_modules` và `package-lock.json`, chạy lại `npm install`

### Lỗi triển khai

**"Failed to deploy"**
- Kiểm tra kết nối Internet
- Đảm bảo đã chạy `npm run build` thành công
- Xóa bộ nhớ cache: `rm -rf dist/`
- Thử lại

**"Function not found"**
- Kiểm tra tệp tồn tại: `netlify/functions/ticket.js`, `kv.js`, `login.js`
- Kiểm tra file `netlify.toml` có `functions = "netlify/functions"`

### Lỗi chức năng

**"Không thể lưu dữ liệu"**
- Kiểm tra kết nối Internet
- Xem console (F12) có lỗi?
- Kiểm tra Netlify Blobs trong bảng điều khiển Netlify

**"Không thể cấp số phiếu"**
- Xem log của hàm `ticket.js` (Netlify Console)
- Kiểm tra quota Netlify (có thể đã vượt giới hạn)

---

## Nâng cấp

### Cập nhật ứng dụng

Khi có phiên bản mới:

1. Tải phiên bản mới
2. Sao chép các tệp cấu hình cũ (`src/config.json`, v.v.)
3. Cài đặt: `npm install`
4. Build: `npm run build`
5. Triển khai: `netlify deploy --prod`

### Sao lưu dữ liệu

Dữ liệu được lưu trên Netlify Blobs. Để sao lưu:

1. Đăng nhập Netlify
2. Vào **Storage** → **Blobs**
3. Bấm **Export** trên từng kho
4. Lưu file `.json` cực kỳ an toàn

---

## Bảo mật

### Những việc PHẢI làm

- ✅ Thay đổi tất cả mật khẩu mặc định
- ✅ Kích hoạt 2-Factor Authentication (2FA) trên Netlify
- ✅ Sao lưu dữ liệu hàng tuần
- ✅ Cập nhật Node.js / npm định kỳ
- ✅ Kiểm tra nhật ký truy cập

### Những việc KHÔNG được làm

- ❌ Chia sẻ mật khẩu qua email
- ❌ Sử dụng mật khẩu yếu (< 8 ký tự)
- ❌ Để máy tính không khóa khi có người lạ
- ❌ Lưu mật khẩu trong tệp không bảo mật

---

## Liên hệ hỗ trợ

Nếu gặp sự cố cài đặt:

- **Email**: support@[domain].vn
- **Hotline**: +84 [số điện thoại]
- **Tài liệu**: Xem `docs/` folder
- **GitHub Issues**: Nếu dùng GitHub

---

**Cập nhật lần cuối**: 02/10/2026

**Phiên bản**: 1.0.0
