// netlify/functions/kv.js
// Lưu trữ dữ liệu chính (sự kiện, cấu hình, khách hàng, etc.) sử dụng Netlify Blobs

import { getStore } from '@netlify/blobs';

const STORE_CONFIG = {
  main: 'mining-app-main',       // Kho dữ liệu chính
  sessions: 'mining-app-sessions' // Kho phiên đăng nhập
};

const SESSION_TIMEOUT_MS = 30 * 24 * 60 * 60 * 1000; // 30 ngày

function jsonResponse(statusCode, body) {
  return new Response(JSON.stringify(body), {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    },
  });
}

async function validateToken(req) {
  const auth = req.headers.get('authorization') || '';
  const match = /^Bearer\s+(.+)$/i.exec(auth.trim());
  if (!match) return null;

  const token = match[1].trim();
  if (!token) return null;

  try {
    const sessionsStore = getStore({ name: STORE_CONFIG.sessions, consistency: 'strong' });
    const session = await sessionsStore.get(`session_${token}`, { type: 'json' });
    if (!session) return null;
    if (Date.now() - (session.createdAt || 0) > SESSION_TIMEOUT_MS) return null;
    return session;
  } catch {
    return null;
  }
}

export default async (req) => {
  if (req.method === 'OPTIONS') return jsonResponse(200, {});

  // Xác thực người dùng
  const session = await validateToken(req);
  if (!session) return jsonResponse(401, { error: 'Chưa đăng nhập' });

  const mainStore = getStore({ name: STORE_CONFIG.main, consistency: 'strong' });
  const url = new URL(req.url);
  const path = url.pathname.replace(/.*\/kv\/?/, '').split('/')[0];

  try {
    if (req.method === 'GET') {
      const data = await mainStore.get(path, { type: 'json' });
      return jsonResponse(200, { path, data: data || null });
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      const body = await req.json();
      await mainStore.setJSON(path, body.value || body);
      return jsonResponse(200, { path, success: true });
    }

    if (req.method === 'DELETE') {
      await mainStore.delete(path);
      return jsonResponse(200, { path, success: true });
    }

    return jsonResponse(405, { error: 'Phương thức không được hỗ trợ' });
  } catch (error) {
    return jsonResponse(500, {
      error: error.message || 'Lỗi máy chủ',
      details: error.toString()
    });
  }
};
