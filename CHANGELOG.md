# Lịch sử phiên bản

---

## Phiên bản 1.0.0 (02/10/2026) — Ổn định

### ✨ Tính năng mới

- **Quản lý phương tiện**: Ghi nhận xe vào/ra qua cổng
- **Kỹ thuật ghi nhận**: Nhập kích thước, khối lượng, khách hàng
- **Lập phiếu xuất**: Tự động cấp số phiếu, in 3 liên
- **Báo cáo tài chính**: Công nợ, doanh thu theo khách hàng
- **Dashboard giám đốc**: Thống kê thời gian thực
- **Kiểm soát quyền**: 7 vai trò với quyền riêng
- **Lưu trữ đám mây**: Sử dụng Netlify Blobs (không cần database)

### 🐛 Sửa lỗi

- **Lỗi trùng số phiếu**: Sử dụng Netlify Blobs v11.1.1 với onlyIfNew (atomic)
- **Lỗi xe lặp lại**: Sửa thuật toán pairing để đúng xử lý multi-trip
- **Lỗi phiên**: Tăng thời gian hết hạn lên 30 ngày

### 📝 Tài liệu

- Hướng dẫn bắt đầu nhanh (QUICK_START.md)
- Hướng dẫn cài đặt chi tiết (INSTALLATION_GUIDE.md)
- Hướng dẫn sử dụng từng vai trò (USER_GUIDE.md)
- Hướng dẫn cấu hình (CONFIGURATION.md)
- Tài liệu nội dung gói (PACKAGE_CONTENTS.md)

### 🔒 Bảo mật

- Xác thực người dùng với token Bearer
- Session timeout 30 ngày
- Kiểm soát quyền dựa trên vai trò (RBAC)
- SSL/HTTPS tự động (Netlify)

### 🌐 Hỗ trợ ngôn ngữ

- Tiếng Việt: 100% (UI, tài liệu, lỗi)
- Không dùng tiếng Anh trong giao diện

---

## Phiên bản 0.9.0 (Bản xem trước - không phát hành)

### Tính năng

- Bản beta của quản lý xe
- Ghi nhận kích thước (bản cơ bản)
- Báo cáo sơ khai

### Vấn đề đã biết

- Lỗi trùng số phiếu khi 2 máy xúc cùng xác nhận
- Lỗi xe lặp lại không xử lý đúng
- Hiệu suất chậm với dữ liệu lớn

---

## Lộ trình (Roadmap)

### Phiên bản 1.1 (Quý 4/2026)

- [ ] Tích hợp camera (nhận diện biển số tự động)
- [ ] Xuất báo cáo PDF
- [ ] Hỗ trợ tiếng Anh

### Phiên bản 1.2 (Quý 1/2027)

- [ ] Mobile app (iOS/Android)
- [ ] Tích hợp thanh toán (ngân hàng)
- [ ] Quản lý kho xúp

### Phiên bản 2.0 (Quý 2/2027)

- [ ] Machine learning (dự báo sản lượng)
- [ ] IoT sensors (GPS, cảm biến)
- [ ] Multi-site management (quản lý nhiều mỏ)

---

## Hỗ trợ

- **Bug report**: Gửi email support@[domain].vn
- **Feature request**: Gửi email support@[domain].vn
- **Documentation**: Xem docs/ folder

---

**Cập nhật lần cuối**: 02/10/2026
