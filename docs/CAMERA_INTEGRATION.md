# Hướng dẫn Tích hợp Camera HikCentral

## Tổng quan

Phần mềm Khai thác Mỏ hỗ trợ tích hợp Camera HikCentral ANPR (Automatic Number Plate Recognition) để tự động nhận dạng biển số xe.

## Cách kết nối Camera

### Phương pháp 1: Webhook từ Camera (Tự động)

Camera gửi dữ liệu trực tiếp tới webhook endpoint.

**Endpoint:**
```
POST https://[your-domain]/.netlify/functions/camera-webhook
```

**Payload:**
```json
{
  "plate": "29A12345",
  "timestamp": 1696300000000,
  "imageUrl": "https://camera.local/snapshot/12345.jpg"
}
```

**Thiết lập trên Camera HikCentral:**
1. Mở HikCentral Professional
2. Vào Settings → ANPR → Event Notification
3. Chọn "HTTP POST"
4. Nhập URL webhook: `https://[your-domain]/.netlify/functions/camera-webhook`
5. Header: `Content-Type: application/json`
6. Lưu cấu hình

### Phương pháp 2: Import từ File Excel

Nhập danh sách biển số từ file Excel.

**Endpoint:**
```
POST https://[your-domain]/.netlify/functions/import-plates
Header: Authorization: Bearer [token]
```

**Payload:**
```json
{
  "plates": ["29A12345", "36B67890", "51C54321"],
  "source": "excel_import"
}
```

**Sử dụng từ UI:**
1. Đăng nhập với vai trò Bảo vệ
2. Vào mục "Lấy biển số xe từ Camera HikCentral"
3. Nếu có file Excel: Mở console → dùng API để import
4. Nếu manual: Nhập từng biển số bằng tay

### Phương pháp 3: Chương trình cầu nối trên máy Bảo vệ

Sử dụng ứng dụng Windows trên máy bảo vệ để kết nối camera.

**Yêu cầu:**
- Node.js 18.17.0+
- npm packages: axios, dotenv

**Script ví dụ:**
```javascript
const axios = require('axios');

const CAMERA_API = 'http://camera.local:8080/api/plates';
const WEBHOOK_URL = 'https://your-domain/.netlify/functions/camera-webhook';

async function syncPlates() {
  try {
    const response = await axios.get(CAMERA_API);
    const plates = response.data.plates || [];

    for (const plate of plates) {
      await axios.post(WEBHOOK_URL, {
        plate: plate.number,
        timestamp: Date.now(),
        imageUrl: plate.imageUrl
      });
    }
  } catch (error) {
    console.error('Sync error:', error.message);
  }
}

setInterval(syncPlates, 5000); // Đồng bộ mỗi 5 giây
```

## Xem Log Camera

Để kiểm tra xem camera có gửi dữ liệu không:

1. Đăng nhập với vai trò Bảo vệ hoặc cao hơn
2. Vào mục "Lấy biển số xe từ Camera HikCentral"
3. Nhấn "Xem log camera" để xem lịch sử
4. Kiểm tra lỗi nếu camera không gửi được dữ liệu

## Troubleshooting

### Camera không gửi dữ liệu

**Kiểm tra:**
1. Camera có kết nối internet không?
2. URL webhook có đúng không? (copy nguyên vẹn, không thiếu gì)
3. Firewall/Proxy có chặn không?
4. Xem log camera để tìm lỗi

**Debug:**
```bash
# Test webhook từ terminal
curl -X POST https://[your-domain]/.netlify/functions/camera-webhook \
  -H "Content-Type: application/json" \
  -d '{"plate":"TEST123","timestamp":'$(date +%s000)'}'
```

### Biển số bị trùng

Phần mềm tự động bỏ qua biển số trùng trong vòng 1 phút.

**Nếu vẫn thấy trùng:**
- Kiểm tra xem camera gửi 2 lần trong 1 phút không
- Cấu hình camera để không gửi lại cùng biển số trong 2 phút

### Biển số bị sai

Nếu camera nhận diện sai biển số:

1. Kỹ thuật có thể sửa lại biển số
2. Vào mục "Xe đang trong mỏ" 
3. Chọn xe → "Sửa biển số"
4. Nhập biển số đúng

## API Response

### Camera Webhook Response

**Success (200):**
```json
{
  "success": true,
  "eventId": "camera_1696300000000_abc123def",
  "plate": "29A12345",
  "message": "Vehicle recorded successfully"
}
```

**Error (400):**
```json
{
  "error": "Plate number required"
}
```

### Import Plates Response

**Success (200):**
```json
{
  "success": true,
  "imported": 3,
  "errors": null,
  "message": "3 plate(s) imported successfully"
}
```

**Error (401):**
```json
{
  "error": "Invalid token"
}
```

## Bảo mật

- Webhook không cần xác thực (camera không lưu token)
- Import API cần Bearer token (lấy từ session)
- Tất cả dữ liệu được mã hóa khi truyền (HTTPS)
- Log camera được lưu để audit

## Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra "Xem hướng dẫn kết nối Camera" trong UI
2. Xem log camera để tìm lỗi
3. Contact hỗ trợ kỹ thuật
