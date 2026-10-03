# Hướng dẫn sử dụng Phần mềm Khai thác Mỏ

---

## Mục lục

1. [Đăng nhập](#đăng-nhập)
2. [Bảo vệ cổng](#bảo-vệ-cổng)
3. [Kỹ thuật](#kỹ-thuật)
4. [Lái máy xúc](#lái-máy-xúc)
5. [Kế toán mỏ](#kế-toán-mỏ)
6. [Giám đốc](#giám-đốc)
7. [Kế toán công ty](#kế-toán-công-ty)
8. [Ban lãnh đạo](#ban-lãnh-đạo)

---

## Đăng nhập

### Bước 1: Mở ứng dụng
- Truy cập URL: `https://[domain-name]/`
- Trình duyệt sẽ hiển thị màn hình đăng nhập

### Bước 2: Nhập tài khoản
- **Tên đăng nhập**: Tên người dùng (được cấp bởi quản trị viên)
- **Mật khẩu**: Mật khẩu (được cấp bởi quản trị viên)

```
Tên đăng nhập: baove
Mật khẩu: •••••••
```

### Bước 3: Xác nhận
- Bấm nút **Đăng nhập**
- Nếu sai, sẽ thấy thông báo "Tên đăng nhập hoặc mật khẩu không đúng"
- Phiên làm việc kéo dài 30 ngày (tự động đăng xuất sau đó)

### Đặt lại mật khẩu
- Nhấn **"Quên mật khẩu?"** (nếu có chức năng)
- Hoặc liên hệ quản trị viên

### Đăng xuất
- Bấm biểu tượng người dùng ở góc trên cùng
- Chọn **Đăng xuất**

---

## Bảo vệ cổng

**Vai trò**: Ghi nhận xe vào/ra cổng

### Màn hình chính

Hiển thị:
- Danh sách xe hiện có trong mỏ
- Giờ vào của mỗi xe
- Nút ghi nhận xe ra cổng

### Quy trình ghi nhận xe vào

**Tự động**: Khi xe đi qua cổng, camera ghi nhận biển số tự động

**Thủ công** (nếu camera không hoạt động):
1. Bấm nút **Ghi nhận xe vào**
2. Nhập biển số xe (hoặc chọn từ danh sách)
3. Chọn loại xe (4 chân, 2 chân, đầu kéo)
4. Bấm **Xác nhận**

```
Ví dụ:
Biển số: 29A-12345
Loại xe: Xe ben 4 chân
Thời gian: 08:30 (tự động)
```

### Quy trình ghi nhận xe ra cổng (KHÔNG có hàng)

Khi lái máy xúc đã xúc đầy hàng, xe sẽ ra cổng. Bảo vệ **KHÔNG cần** ghi nhận lại — hệ thống tự động xử lý.

**Trường hợp xe ra nhưng chưa xúc**:
1. Bấm nút **Xe ra cổng (chưa xúc)**
2. Chọn biển số xe từ danh sách
3. Bấm **Xác nhận**

Ghi chú: Sau khi xác nhận, xe sẽ biến mất khỏi danh sách "Xe trong mỏ" ở giao diện Bảo vệ.

### Xử lý lỗi

**Vấn đề**: Camera ghi nhận xe 2 lần (cùng biển số, giờ khác nhau)
- **Giải pháp**: Bảo vệ ghi nhận xe ra 1 lần. Hệ thống tự động xử lý đúng xe nào vẫn còn trong mỏ.

**Vấn đề**: Xe không xuất hiện trong danh sách
- **Giải pháp**: Nhập thủ công bằng nút "Ghi nhận xe vào"

---

## Kỹ thuật

**Vai trò**: Ghi nhận kích thước, khối lượng, khách hàng của xe

### Màn hình chính

Danh sách **xe cần ghi nhận** (xe vừa vào mỏ, chưa có thông tin chi tiết):

```
Biển số | Giờ vào | Trạng thái
29A-123  08:30   Chưa ghi nhận
29A-124  08:45   Chưa ghi nhận
```

### Quy trình ghi nhận

**Bước 1: Chọn xe**
- Bấm vào dòng xe cần ghi nhận
- Màn hình chi tiết mở ra

**Bước 2: Nhập kích thước xe**
- **Chiều dài** (mét)
- **Chiều rộng** (mét)  
- **Chiều cao** (mét)

```
Ví dụ xe ben:
Chiều dài: 5.5 m
Chiều rộng: 2.4 m
Chiều cao: 1.8 m
→ Khối lượng = 5.5 × 2.4 × 1.8 = 23,76 m³ (tự động)
```

**Bước 3: Nhập khối lượng cộng thêm do ngọn** (nếu có)

Nếu hàng xếp cao hơn thùng xe:
- Nhập kích thước phần ngọn (Dài × Rộng × Cao)
- Hệ thống tự động cộng vào

```
Ví dụ:
Khối lượng thùng: 23,76 m³
Khối lượng ngọn: 2,4 × 2,4 × 0,5 = 2,88 m³
Tổng cộng: 26,64 m³
```

**Bước 4: Chọn khách hàng**
- Danh sách khách hàng hiển thị
- Bấm chọn tên khách hàng
- Đơn giá sẽ hiển thị tự động

```
Khách hàng: Cty TNHH Xây dựng Bắc Ninh
Đơn giá: 65,000 đ/m³
```

**Bước 5: Chọn loại xe** (nếu cần sửa)
- Mặc định dựa trên ghi nhận của Bảo vệ
- Có thể sửa lại nếu sai

**Bước 6: Xác nhận**
- Bấm nút **Xác nhận ghi nhận**
- Xe sẽ chuyển sang trạng thái "Đã ghi nhận, chờ xúc"

### Thêm loại xe mới

Nếu gặp loại xe chưa có trong hệ thống:

1. Bấm **Thêm loại xe mới**
2. Nhập tên loại xe (VD: "Xe tải ba gác")
3. Nhập khối lượng tối đa gợi ý (m³)
4. Bấm **Lưu**

Loại xe mới sẽ được lưu vào hệ thống, các lần sau sẽ sử dụng được.

---

## Lái máy xúc

**Vai trò**: Xác nhận khi xúc đầy hàng

### Màn hình chính

Danh sách **xe đã ghi nhận** (chờ xúc hàng):

```
Biển số | Khách | m³    | Loại xe  | Trạng thái
29A-123  KH-01  23.76  Ben 4 chân Chờ xúc
29A-124  KH-02  19.50  Ben 2 chân Chờ xúc
```

### Quy trình xác nhận xúc đầy

**Bước 1: Chọn xe**
- Bấm vào dòng xe cần xác nhận
- Màn hình chi tiết mở ra

**Bước 2: Chọn máy xúc**
- Chọn từ danh sách máy xúc
- VD: "Máy xúc 01", "Máy xúc 02"

**Bước 3: Chọn lái máy xúc**
- Chọn tên lái máy từ danh sách
- VD: "Lái máy xúc 01"

**Bước 4: Xác nhận**
- Bấm nút **Xúc đầy — Xác nhận**
- Hệ thống sẽ:
  - Tạo số phiếu xuất (tự động, duy nhất)
  - Ghi nhận thời gian xúc
  - Chuyển xe thành trạng thái "Đã xúc"

**Bước 5: Xem phiếu xuất** (tùy chọn)
- Sau khi xác nhận, nút **Xem phiếu** sẽ hiển thị
- Bấm để xem phiếu 3 liên (Kế toán, khách hàng, lái xe)

### Thông báo lỗi

**"Xe này chưa có trên hệ thống"** 
- Biểu tượng ⚠️ vàng
- Kỹ thuật chưa ghi nhận xe này
- Liên hệ với kỹ thuật để ghi nhận trước

**"Quá số lượng xe trong mỏ"**
- Máy xúc của bạn đã xúc quá số lần cho phép hôm nay
- Kiểm tra với quản lý

---

## Kế toán mỏ

**Vai trò**: In phiếu xuất đất

### Màn hình chính

Danh sách **phiếu đã lập**:

```
Phiếu số | Ngày    | Giờ   | Khách hàng      | m³   | Lái xe
000000001 02/10/26 09:15 KH-01 Cty Xây dựng  23.76 LX-01
000000002 02/10/26 09:45 KH-02 Cty San lấp  19.50 LX-02
```

### Quy trình in phiếu

**Bước 1: Tìm phiếu**
- Tìm kiếm theo số phiếu, biển số, khách hàng
- Hoặc cuộn xuống danh sách

**Bước 2: Bấm phiếu cần in**
- Xem trước phiếu 3 liên

**Bước 3: In phiếu**
- Bấm nút **In phiếu (khổ 80mm)**
- Chọn máy in trên thiết bị
- Chọn khổ giấy: **80mm** (mặc định)
- Bấm **In**

### Xem chi tiết phiếu

Bấm vào từng phiếu để xem:
- Số phiếu
- Biển số xe, loại xe
- Khối lượng (m³)
- Khách hàng
- Lái xe
- Ngày/giờ vào, ngày/giờ ra
- 3 liên: Kế toán, khách hàng, lái xe

### Báo cáo công nợ khách hàng

Bấm tab **Báo cáo công nợ**:

- Chọn khoảng ngày (từ ngày → đến ngày)
- Bấm **Xem báo cáo**
- Hiển thị:
  - Khách hàng
  - Số phiếu lập
  - Khối lượng tổng (m³)
  - Doanh thu (m³ × đơn giá)
  - Đã thanh toán
  - Còn nợ

---

## Giám đốc

**Vai trò**: Kiểm soát toàn cảnh hoạt động

### Dashboard — Hôm nay

Thống kê thời gian thực:

```
Ngày: 02/10/2026

Xe vào mỏ hôm nay:   5 xe
Xe xúc xong hôm nay: 3 xe
Xe còn trong mỏ:     2 xe

Khối lượng hôm nay:  87.50 m³
Doanh thu hôm nay:   5,687,500 đ

Máy xúc đang chạy: 
  - Máy xúc 01: 2 xe
  - Máy xúc 02: 1 xe
```

### Biểu đồ thống kê

- **Khối lượng theo máy xúc** (cột): So sánh năng suất từng máy
- **Khối lượng theo khách hàng** (cột): Doanh thu từng khách
- **Xu hướng theo giờ** (đường): Khối lượng đưa ra từng giờ

### Kiểm soát công nợ

- Xem tổng công nợ tất cả khách hàng
- Cảnh báo:
  - 🟡 **Vàng**: Công nợ quá mức cảnh báo (tuỳ chỉnh)
  - 🔴 **Đỏ**: Công nợ rất cao, cần thu hồi ngay

---

## Kế toán công ty

**Vai trò**: Tổng hợp báo cáo công ty

### Màn hình chính

Báo cáo công nợ **toàn công ty**:

```
Công ty CP DV và TM [Tên]

Báo cáo công nợ từ 01/10 đến 31/10

Khách hàng          | Doanh thu | Thanh toán | Nợ lại
KH-01 Cty Xây dựng  | 5,500,000 | 3,000,000 | 2,500,000
KH-02 Cty San lấp   | 4,200,000 | 4,200,000 | 0
KH-03 Cty Khoáng sản| 3,800,000 | 2,000,000 | 1,800,000

CỘNG CỘNG           | 13,500,000| 9,200,000 | 4,300,000
```

### Tính năng

- **Lọc theo khoảng ngày**: Chọn từ ngày → đến ngày
- **Xuất Excel**: In toàn bộ báo cáo ra file Excel
- **In phiếu ghi sổ**: In dạng giấy để ghi sổ kế toán

### Tra soát phiếu

- Tìm kiếm phiếu theo:
  - Số phiếu
  - Biển số xe
  - Khách hàng
  - Lái máy xúc
  - Ngày in

---

## Ban lãnh đạo

**Vai trò**: Xem báo cáo tổng hợp (chỉ xem, không chỉnh sửa)

### Dashboard — Kế hoạch hàng năm

```
Kế hoạch khai thác năm 2026

Loại khoáng | Năm 1   | Năm 2   | Năm 3   | Tổng cộng
Đất sét     | 350,000 | 250,000 | 231,112 | 831,112 m³
Hệ số nở rơi| 1.27    |  1.27   | 1.27    | -

Tiến độ thực hiện năm 1: 45% (157,500 / 350,000 m³)
```

### Cảnh báo

- ⚠️ **Chậm tiến độ**: Nếu thực hiện < 40% so với kế hoạch tháng
- ⚠️ **Vượt công suất**: Nếu thực hiện > 120% so với kế hoạch tháng

### Khả năng thao tác

- Xem báo cáo: ✅ Có
- Chỉnh sửa: ❌ Không
- In báo cáo: ✅ Có
- Xuất Excel: ✅ Có

---

## Thao tác chung

### Tìm kiếm

```
Bấm biểu tượng 🔍 ở góc trên cùng
Nhập từ khóa: số phiếu, biển số, khách hàng
Kết quả tức thì
```

### Làm tươi dữ liệu

```
Bấm biểu tượng ↻ (Làm tươi)
Hệ thống tải dữ liệu mới nhất
```

### Xuất báo cáo

- **Excel**: Bấm nút 📊 "Xuất Excel"
- **PDF**: Bấm nút 📄 "Xuất PDF"
- **In**: Bấm phím **Ctrl+P** (hoặc Cmd+P)

### Chuyển đổi chế độ sáng/tối

```
Bấm biểu tượng 🌙 (góc trên cùng)
- Chế độ tối: Tiết kiệm pin, dễ nhìn ban đêm
- Chế độ sáng: Sáng hơn, dễ thấy dưới ánh nắng
```

---

## Xử lý sự cố thường gặp

### Không thể đăng nhập

**Vấn đề**: "Tên đăng nhập hoặc mật khẩu không đúng"

**Giải pháp**:
1. Kiểm tra lại tên đăng nhập (phân biệt hoa/thường)
2. Kiểm tra lại mật khẩu (có ký tự đặc biệt không?)
3. Caps Lock bật chưa?
4. Liên hệ quản trị viên để đặt lại mật khẩu

### Kết nối chậm

**Vấn đề**: Trang tải lâu, dữ liệu chậm cập nhật

**Giải pháp**:
1. Kiểm tra kết nối Internet
2. Làm tươi trang (Ctrl+R hoặc Cmd+R)
3. Xóa bộ nhớ cache trình duyệt
4. Thử trình duyệt khác

### Phiếu in sai

**Vấn đề**: Phiếu in ra không đúng dữ liệu, hoặc lỗi định dạng

**Giải pháp**:
1. Kiểm tra máy in (kết nối, giấy, mực)
2. Chọn lại khổ giấy 80mm
3. Nếu vẫn sai, xóa bộ nhớ cache in và thử lại
4. Liên hệ quản trị viên

### Xe không xuất hiện trong danh sách

**Vấn đề**: Xe vừa vào mỏ, nhưng không thấy ở giao diện Kỹ thuật

**Giải pháp**:
1. Bảo vệ đã ghi nhận xe vào chưa?
2. Làm tươi giao diện (bấm ↻)
3. Kiểm tra nếu xe đó được ghi nhận là "xe vào mỏ không qua cổng"
4. Nhập thủ công qua nút "Ghi nhận xe vào"

### Quên mật khẩu

**Vấn đề**: Không nhớ mật khẩu, không thể đăng nhập

**Giải pháp**:
1. Bấm **"Quên mật khẩu?"** trên màn hình đăng nhập (nếu có)
2. Hoặc liên hệ quản trị viên:
   - Cung cấp tên đăng nhập
   - Xác nhận danh tính
   - Quản trị viên sẽ cấp mật khẩu mới

---

## Liên hệ hỗ trợ

Nếu gặp vấn đề không có trong hướng dẫn trên:

- **Email**: support@[domain].vn
- **Hotline**: +84 (số điện thoại)
- **Chat**: Bấm biểu tượng 💬 trong ứng dụng

**Giờ làm việc**: 08:00 - 17:00 (Thứ 2 - Thứ 6)

---

**Cập nhật lần cuối**: 02/10/2026
