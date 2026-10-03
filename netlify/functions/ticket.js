// netlify/functions/ticket.js
// Cấp SỐ PHIẾU (ticketNo) duy nhất — tách hẳn khỏi netlify/functions/kv.js vì
// đây là nơi DUY NHẤT chịu trách nhiệm "trọng tài" cấp số, không phải chỗ đọc/
// ghi dữ liệu thông thường.
//
// (Bổ sung 26/09 — SỬA LỖI TRÙNG SỐ PHIẾU khi 2 máy xúc cùng xác nhận)
// Sử dụng @netlify/blobs v11.1.1 với onlyIfNew primitive để cấp số một cách nguyên tử,
// đảm bảo không bao giờ có 2 phiếu cùng số khi nhiều máy xúc xác nhận cùng lúc.

import { getStore } from '@netlify/blobs';

// Cấu hình kho lưu trữ — có thể thay đổi khi triển khai cho các mỏ khác
const STORE_CONFIG = {
  main: 'mining-app-main',         // kho chính lưu dữ liệu sự kiện
  tickets: 'mining-app-tickets',   // kho lưu bộ đếm số phiếu
  sessions: 'mining-app-sessions', // kho lưu phiên đăng nhập
};

const SESSION_TIMEOUT_MS = 30 * 24 * 60 * 60 * 1000; // 30 ngày
const TICKET_COUNTER_KEY = 'ticket_counter';
const MAX_RETRIES = 60;
const RETRY_DELAY_MS = 100;

function jsonResponse(statusCode, body) {
  return new Response(JSON.stringify(body), {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
    },
  });
}

async function validateToken(req) {
  const auth = req.headers.get('authorization') || '';
  const match = /^Bearer\s+(.+)$/i.exec(auth.trim());
  if (!match) return false;

  const token = match[1].trim();
  if (!token) return false;

  try {
    const sessionsStore = getStore({ name: STORE_CONFIG.sessions, consistency: 'strong' });
    const session = await sessionsStore.get(`session_${token}`, { type: 'json' });
    if (!session) return false;
    if (Date.now() - (session.createdAt || 0) > SESSION_TIMEOUT_MS) return false;
    return true;
  } catch {
    return false;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Lấy số phiếu lớn nhất từng được cấp
async function findMaxTicketNumber() {
  try {
    const mainStore = getStore({ name: STORE_CONFIG.main, consistency: 'strong' });
    const events = (await mainStore.get('events', { type: 'json' })) || [];
    let maxNum = 0;
    events.forEach((event) => {
      if (event && event.type === 'ticket_print' && event.ticketNo) {
        const num = parseInt(event.ticketNo, 10);
        if (!Number.isNaN(num) && num > maxNum) maxNum = num;
      }
    });
    return maxNum;
  } catch {
    return 0;
  }
}

export default async (req) => {
  if (req.method === 'OPTIONS') return jsonResponse(200, {});
  if (req.method !== 'POST') return jsonResponse(405, { error: 'Phương thức không được hỗ trợ' });

  const isValid = await validateToken(req);
  if (!isValid) return jsonResponse(401, { error: 'Chưa đăng nhập hoặc phiên đăng nhập đã hết hạn' });

  const ticketsStore = getStore({ name: STORE_CONFIG.tickets, consistency: 'strong' });

  // Dấu vân tay duy nhất của yêu cầu này
  const fingerprint = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}-${Math.random().toString(36).slice(2, 10)}`;

  let currentNumber = await ticketsStore.get(TICKET_COUNTER_KEY, { type: 'json' });
  if (currentNumber === null || currentNumber === undefined) {
    currentNumber = await findMaxTicketNumber();
  }

  // Thử lấy số phiếu tiếp theo bằng cách cạnh tranh với các yêu cầu khác
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const candidateNumber = currentNumber + 1;
    const reserveKey = `reserved_${candidateNumber}`;

    try {
      // Cố gắng đặt giữ số này (chỉ thành công nếu chưa ai đặt)
      const success = await ticketsStore.setJSON(reserveKey, fingerprint, {
        metadata: { onlyIfNew: true }
      }).then(() => true).catch(() => false);

      if (!success) {
        // Số này đã bị ai đó đặt giữ trước rồi, thử số tiếp theo
        currentNumber = candidateNumber;
        continue;
      }

      // Đợi một chút rồi kiểm tra xem dấu vân tay của mình còn ở đó không
      await sleep(RETRY_DELAY_MS + Math.random() * 50);
      const storedFingerprint = await ticketsStore.get(reserveKey);

      if (storedFingerprint === fingerprint) {
        // Thắng! Cập nhật bộ đếm
        await ticketsStore.setJSON(TICKET_COUNTER_KEY, candidateNumber).catch(() => {});
        const ticketNo = String(candidateNumber).padStart(9, '0');
        return jsonResponse(200, { ticketNo, success: true });
      }

      // Mất số này cho yêu cầu khác, thử tiếp
      currentNumber = candidateNumber;
    } catch (error) {
      // Lỗi tạm thời, thử số tiếp theo
      currentNumber = currentNumber + 1;
    }
  }

  return jsonResponse(503, {
    error: 'Quá nhiều máy xúc xác nhận cùng lúc — vui lòng thử lại sau ít phút',
    success: false
  });
};
