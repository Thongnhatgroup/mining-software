# Hướng dẫn cấu hình

---

## Giới thiệu

Phần mềm Khai thác Mỏ có thể tùy chỉnh hoàn toàn để phù hợp với mỏ của bạn. Tài liệu này hướng dẫn cách cấu hình các thông số chính.

---

## Cấu hình cơ bản

### 1. Tên mỏ và công ty

**Vị trí**: File `src/App.jsx`, dòng 55-90 (DEFAULT_CONFIG)

Cần thay đổi:
```javascript
const DEFAULT_CONFIG = {
  siteName: "[Tên mỏ]",           // VD: "Mỏ Khuôn Giàn" hoặc "Mỏ Thạch Khê"
  companyName: "[Tên công ty]",   // VD: "Công ty CP Khoáng sản ABC"
  
  // ... các cấu hình khác
};
```

Nơi hiển thị:
- ✅ Phiếu xuất (3 liên)
- ✅ Báo cáo
- ✅ Tiêu đề ứng dụng

### 2. Loại xe

**Vị trí**: File `src/App.jsx`, dòng 48-53

Mặc định:
```javascript
const LOAI_XE = [
  { id: 'ben4chan', ten: 'Xe ben 4 chân', khoiLuong: 25 },
  { id: 'ben2chan', ten: 'Xe ben 2 chân', khoiLuong: 15 },
  { id: 'daukeo', ten: 'Xe đầu kéo', khoiLuong: 30 },
];
```

**Để thêm loại xe mới**:
```javascript
const LOAI_XE = [
  { id: 'ben4chan', ten: 'Xe ben 4 chân', khoiLuong: 25 },
  { id: 'ben2chan', ten: 'Xe ben 2 chân', khoiLuong: 15 },
  { id: 'daukeo', ten: 'Xe đầu kéo', khoiLuong: 30 },
  { id: 'taiba3', ten: 'Xe tải ba gác', khoiLuong: 35 },  // Thêm mới
  { id: 'taiva5', ten: 'Xe tải 5 tấn', khoiLuong: 10 },  // Thêm mới
];
```

**Ghi chú**:
- `id`: Định danh duy nhất (không dấu, không khoảng trắng)
- `ten`: Tên hiển thị cho người dùng
- `khoiLuong`: Khối lượng gợi ý (m³) cho loại xe này

### 3. Máy xúc

**Vị trí**: File `src/App.jsx`, dòng 63-66

```javascript
excavators: [
  { id: 'XUC-01', name: 'Máy xúc 01' },
  { id: 'XUC-02', name: 'Máy xúc 02' },
  { id: 'XUC-03', name: 'Máy xúc 03' },
  { id: 'XUC-04', name: 'Máy xúc 04' },
],
```

**Để thay đổi**:
- Sửa `id` nếu có hệ thống đánh số khác
- Sửa `name` để khớp với tên máy tại mỏ

**Ví dụ**:
```javascript
excavators: [
  { id: 'CAT-329', name: 'CAT 329D (Khu A)' },
  { id: 'KOMATSU-A', name: 'KOMATSU PC200 (Khu B)' },
  { id: 'VOLVO-C', name: 'VOLVO EC220E (Khu C)' },
],
```

### 4. Lái máy xúc

**Vị trí**: File `src/App.jsx`, dòng 67-72

```javascript
operators: [
  { id: 'LX-01', name: 'Lái máy xúc 01' },
  { id: 'LX-02', name: 'Lái máy xúc 02' },
  // ... tối đa 20-30 người
],
```

**Để cập nhật khi có nhân viên mới**:
```javascript
operators: [
  { id: 'LX-01', name: 'Nguyễn Văn A' },
  { id: 'LX-02', name: 'Trần Thị B' },
  { id: 'LX-03', name: 'Phạm Văn C' },
],
```

### 5. Khách hàng

**Vị trị**: File `src/App.jsx`, dòng 75-78

```javascript
customers: [
  { id: 'KH-01', name: 'Cty TNHH Xây dựng Bắc Ninh', donGia: 65000 },
  { id: 'KH-02', name: 'Cty CP San lấp Kép', donGia: 60000 },
],
```

**Để thêm khách hàng mới**:
```javascript
customers: [
  { id: 'KH-01', name: 'Cty TNHH Xây dựng Bắc Ninh', donGia: 65000 },
  { id: 'KH-02', name: 'Cty CP San lấp Kép', donGia: 60000 },
  { id: 'KH-03', name: 'Công ty Khoáng sản ABC', donGia: 70000 },
  { id: 'KH-04', name: 'Cty Phát triển Công nghiệp', donGia: 62000 },
],
```

**Chú ý**:
- `donGia`: Giá bán (VNĐ/m³) cho khách hàng này
- Giá này được dùng để tính doanh thu tự động

---

## Cấu hình tài chính

### 1. Cảnh báo công nợ

**Vị trí**: File `src/App.jsx`, dòng 79-80

```javascript
canhBaoVang: 100000000,  // 100 triệu — nếu nợ ≤ số này → cảnh báo vàng
canhBaoDo: 50000000,     // 50 triệu — nếu nợ ≤ số này → cảnh báo đỏ
```

**Ý nghĩa**:
- 🟢 **Xanh**: Công nợ < 50 triệu (bình thường)
- 🟡 **Vàng**: Công nợ 50-100 triệu (cần chú ý)
- 🔴 **Đỏ**: Công nợ > 100 triệu (cần thu hồi gấp)

**Để thay đổi** (tùy chính sách công ty):
```javascript
canhBaoVang: 200000000,  // 200 triệu
canhBaoDo: 100000000,    // 100 triệu
```

### 2. Đơn giá bán mặc định

**Vị trí**: File `src/App.jsx`, dòng 81

```javascript
donGiaBanDat: 65000,  // Nếu không ghi đơn giá khách hàng, dùng giá này
```

**Ghi chú**: Giá này chỉ dùng làm mặc định. Khách hàng cụ thể sẽ có giá riêng.

### 3. Kế hoạch khai thác năm

**Vị trí**: File `src/App.jsx`, dòng 82-88

```javascript
thietKe: {
  tongTruLuongNguyenKhoi: 831112,  // Tổng khối lượng nguyên khai (m³) năm 1+2+3
  heSoNoRoi: 1.27,                 // Hệ số nở rơi (tỷ lệ tăng thể tích sau khai thác)
  theoNam: [
    { nam: 1, nguyenKhoi: 350000 },
    { nam: 2, nguyenKhoi: 250000 },
    { nam: 3, nguyenKhoi: 231112 },
  ],
},
```

**Ý nghĩa**:
- `tongTruLuongNguyenKhoi`: Tổng lượng đất/đá sẽ khai thác (3 năm)
- `heSoNoRoi`: Sau khi khai thác, thể tích tăng thêm bao nhiêu (1.27 = tăng 27%)
- `theoNam`: Kế hoạch chi tiết từng năm

**Ví dụ thực tế**:
```javascript
thietKe: {
  tongTruLuongNguyenKhoi: 1000000,  // 1 triệu m³
  heSoNoRoi: 1.25,                  // Tăng 25%
  theoNam: [
    { nam: 1, nguyenKhoi: 400000 },  // Năm 1: 400k m³
    { nam: 2, nguyenKhoi: 350000 },  // Năm 2: 350k m³
    { nam: 3, nguyenKhoi: 250000 },  // Năm 3: 250k m³
  ],
},
```

---

## Cấu hình người dùng

### Tài khoản mặc định

**Vị trí**: File `netlify/functions/login.js`, dòng 10-16

```javascript
const DEFAULT_USERS = {
  'baove': { password: 'baove123', role: 'baove', name: 'Bảo vệ cổng' },
  'kythuat': { password: 'kythuat123', role: 'kythuat', name: 'Kỹ thuật' },
  'laixuc': { password: 'laixuc123', role: 'laixuc', name: 'Lái máy xúc' },
  'ketoan': { password: 'ketoan123', role: 'ketoan', name: 'Kế toán mỏ' },
  'giamdoc': { password: 'giamdoc123', role: 'giamdoc', name: 'Giám đốc' },
  'ketoancongty': { password: 'ketoancongty123', role: 'ketoancongty', name: 'Kế toán công ty' },
  'banlanhdao': { password: 'banlanhdao123', role: 'banlanhdao', name: 'Ban lãnh đạo' },
};
```

### Thêm tài khoản mới

```javascript
const DEFAULT_USERS = {
  // ... tài khoản cũ
  'baove2': { password: 'baove2123', role: 'baove', name: 'Bảo vệ cổng (ca 2)' },
  'laixuc2': { password: 'laixuc2123', role: 'laixuc', name: 'Lái máy xúc 2' },
};
```

### Thay đổi mật khẩu

Để thay đổi mật khẩu tài khoản `baove`:

```javascript
'baove': { password: 'password_moi_123', role: 'baove', name: 'Bảo vệ cổng' },
```

**Ghi chú**: Sau khi thay đổi, cần triển khai lại:
```bash
npm run build
netlify deploy --prod
```

---

## Cấu hình giao diện

### Tên các vai trò

**Vị trí**: File `src/App.jsx`, dòng 31-40

```javascript
const ROLES_INFO = {
  banlanhdao: { label: 'Ban lãnh đạo trụ sở (chỉ xem)', icon: Building2 },
  ketoancongty: { label: 'Kế toán công ty (trụ sở)', icon: Wallet },
  giamdoc: { label: 'Giám đốc mỏ', icon: LayoutDashboard },
  kythuat: { label: 'Kỹ thuật — Kiểm tra khối lượng, kích thước xe', icon: ClipboardCheck },
  // ... etc
};
```

Có thể sửa `label` để khớp với tên gọi tại công ty:

```javascript
const ROLES_INFO = {
  giamdoc: { label: 'Trưởng mỏ (Quản lý)', icon: LayoutDashboard },
  ketoan: { label: 'Kế toán (Ghi phiếu)', icon: Calculator },
  // ... etc
};
```

---

## Cấu hình Netlify Functions

### Store Names (Tên kho lưu trữ)

**Vị trí**: File `netlify/functions/ticket.js`, dòng 12-16

```javascript
const STORE_CONFIG = {
  main: 'mining-app-main',         // Kho chính
  tickets: 'mining-app-tickets',   // Bộ đếm phiếu
  sessions: 'mining-app-sessions', // Phiên đăng nhập
};
```

**Ghi chú**: Tên này nên khác nhau nếu triển khai nhiều mỏ trên cùng tài khoản Netlify.

**Ví dụ**:
```javascript
// Mỏ 1
const STORE_CONFIG = {
  main: 'mo1-main',
  tickets: 'mo1-tickets',
  sessions: 'mo1-sessions',
};

// Mỏ 2
const STORE_CONFIG = {
  main: 'mo2-main',
  tickets: 'mo2-tickets',
  sessions: 'mo2-sessions',
};
```

---

## Cấu hình phiên đăng nhập

### Thời gian hết hạn

**Vị trí**: File `netlify/functions/login.js`, dòng 8

```javascript
const SESSION_TIMEOUT_MS = 30 * 24 * 60 * 60 * 1000;  // 30 ngày
```

**Để thay đổi**:
```javascript
// 7 ngày
const SESSION_TIMEOUT_MS = 7 * 24 * 60 * 60 * 1000;

// 90 ngày
const SESSION_TIMEOUT_MS = 90 * 24 * 60 * 60 * 1000;

// 1 ngày (khoa học hơn)
const SESSION_TIMEOUT_MS = 1 * 24 * 60 * 60 * 1000;
```

---

## Cấu hình nâng cao

### Giới hạn số phiếu cùng lúc

**Vị trí**: File `netlify/functions/ticket.js`, dòng 37

```javascript
const MAX_RETRIES = 60;  // Tối đa 60 lần thử cấp số
```

Nếu có quá 60 lái máy bấm xác nhận cùng lúc, sẽ xảy ra lỗi. Để tăng:

```javascript
const MAX_RETRIES = 100;  // Hỗ trợ tới 100 máy xúc cùng lúc
```

### Thời gian chờ cấp số

**Vị trí**: File `netlify/functions/ticket.js`, dòng 38

```javascript
const RETRY_DELAY_MS = 100;  // Đợi 100ms trước khi kiểm tra
```

Tăng nếu máy chủ chậm:

```javascript
const RETRY_DELAY_MS = 200;  // Đợi 200ms
```

---

## Cấu hình phiếu in

### Khổ giấy

Mặc định: **80mm** (khổ máy in loại nhỏ)

**Để thay đổi**:
- Trong `netlify/functions/kv.js`
- Tìm `@page{size:80mm auto;}`
- Sửa thành: `@page{size:100mm auto;}` (hoặc khổ khác)

### Số lượng liên

Mặc định: **3 liên** (Kế toán, Khách hàng, Lái xe)

Để thay đổi, sửa trong `src/App.jsx`, hàm `phieuGiaoNhanHTML`:

```javascript
const lienList = ['Liên 1 — Kế toán mỏ lưu', 'Liên 2 — Cấp khách hàng', 'Liên 3 — Lái xe ký nhận, giữ lại'];
```

---

## Kiểm tra cấu hình

Sau khi cấu hình, hãy chạy:

```bash
npm run build
```

Nếu thấy lỗi (màu đỏ):
- Kiểm tra cú pháp JSON (dấu ngoặc, phẩy)
- Kiểm tra ID duy nhất (không trùng)
- Kiểm tra kiểu dữ liệu (số, chữ)

Nếu build thành công:
```bash
netlify deploy --prod
```

---

## Ví dụ cấu hình toàn bộ

Dưới đây là ví dụ cấu hình cho một mỏ cụ thể:

```javascript
// src/App.jsx
const DEFAULT_CONFIG = {
  // Thông tin mỏ
  siteName: "Mỏ Thạch Khê",
  companyName: "Công ty CP Khoáng sản Bắc Ninh",
  
  // Loại xe
  vehicleTypes: [
    { id: 'ben4', ten: 'Xe ben 4 chân', khoiLuong: 25 },
    { id: 'ben2', ten: 'Xe ben 2 chân', khoiLuong: 15 },
    { id: 'daukeo', ten: 'Xe đầu kéo', khoiLuong: 30 },
    { id: 'taiba', ten: 'Xe tải ba gác', khoiLuong: 35 },
  ],
  
  // Máy xúc
  excavators: [
    { id: 'CAT-01', name: 'CAT 329D' },
    { id: 'KOMATSU-01', name: 'KOMATSU PC200' },
    { id: 'VOLVO-01', name: 'VOLVO EC220' },
  ],
  
  // Lái máy
  operators: [
    { id: 'LX-01', name: 'Nguyễn Văn A' },
    { id: 'LX-02', name: 'Trần Thị B' },
    { id: 'LX-03', name: 'Phạm Văn C' },
    { id: 'LX-04', name: 'Đinh Văn D' },
  ],
  
  // Khách hàng
  customers: [
    { id: 'KH-01', name: 'Cty Xây dựng Bắc Ninh', donGia: 65000 },
    { id: 'KH-02', name: 'Cty San lấp Kép', donGia: 60000 },
    { id: 'KH-03', name: 'Cty Khoáng sản ABC', donGia: 70000 },
  ],
  
  // Cảnh báo công nợ
  canhBaoVang: 150000000,  // 150 triệu
  canhBaoDo: 75000000,     // 75 triệu
  donGiaBanDat: 65000,
  
  // Kế hoạch
  thietKe: {
    tongTruLuongNguyenKhoi: 1000000,
    heSoNoRoi: 1.25,
    theoNam: [
      { nam: 1, nguyenKhoi: 400000 },
      { nam: 2, nguyenKhoi: 350000 },
      { nam: 3, nguyenKhoi: 250000 },
    ],
  },
};
```

---

## Sao lưu cấu hình

**Rất quan trọng**: Sao lưu file cấu hình trước khi nâng cấp:

```bash
cp src/App.jsx src/App.jsx.backup
cp netlify/functions/login.js netlify/functions/login.js.backup
cp netlify/functions/ticket.js netlify/functions/ticket.js.backup
```

---

## Liên hệ hỗ trợ

Nếu cần hỗ trợ cấu hình:

- **Email**: support@[domain].vn
- **Hotline**: +84 [số điện thoại]
- **Tài liệu**: Xem README.md

---

**Cập nhật lần cuối**: 02/10/2026

**Phiên bản**: 1.0.0
