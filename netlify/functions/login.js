// netlify/functions/login.js
// Xác thực người dùng và quản lý phiên đăng nhập

import { getStore } from '@netlify/blobs';
import crypto from 'crypto';

const STORE_CONFIG = {
  sessions: 'mining-app-sessions',
  config: 'mining-app-config'
};

const SESSION_TIMEOUT_MS = 30 * 24 * 60 * 60 * 1000; // 30 ngày

// Danh sách người dùng mặc định — nên thay đổi mật khẩu lần đầu triển khai
const DEFAULT_USERS = {
  'baove': { password: 'baove123', role: 'baove', name: 'Bảo vệ cổng' },
  'kythuat': { password: 'kythuat123', role: 'kythuat', name: 'Kỹ thuật' },
  'laixuc': { password: 'laixuc123', role: 'laixuc', name: 'Lái máy xúc' },
  'ketoan': { password: 'ketoan123', role: 'ketoan', name: 'Kế toán mỏ' },
  'giamdoc': { password: 'giamdoc123', role: 'giamdoc', name: 'Giám đốc' },
  'ketoancongty': { password: 'ketoancongty123', role: 'ketoancongty', name: 'Kế toán công ty' },
  'banlanhdao': { password: 'banlanhdao123', role: 'banlanhdao', name: 'Ban lãnh đạo' },
};

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

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

async function loadUsers() {
  try {
    const configStore = getStore({ name: STORE_CONFIG.config, consistency: 'strong' });
    const customUsers = await configStore.get('users', { type: 'json' });
    if (customUsers) return customUsers;
  } catch {
    // Nếu không có tài khoản tùy chỉnh, dùng mặc định
  }
  return DEFAULT_USERS;
}

export default async (req) => {
  if (req.method === 'OPTIONS') return jsonResponse(200, {});

  if (req.method !== 'POST') {
    return jsonResponse(405, { error: 'Chỉ hỗ trợ POST' });
  }

  try {
    const body = await req.json();
    const { username, password, action } = body;

    // Hành động logout
    if (action === 'logout') {
      const auth = req.headers.get('authorization') || '';
      const match = /^Bearer\s+(.+)$/i.exec(auth.trim());
      if (match) {
        const token = match[1].trim();
        const sessionsStore = getStore({ name: STORE_CONFIG.sessions, consistency: 'strong' });
        await sessionsStore.delete(`session_${token}`).catch(() => {});
      }
      return jsonResponse(200, { success: true, message: 'Đã đăng xuất' });
    }

    // Hành động login
    if (!username || !password) {
      return jsonResponse(400, { error: 'Vui lòng nhập tên đăng nhập và mật khẩu' });
    }

    const users = await loadUsers();
    const user = users[username];

    if (!user) {
      return jsonResponse(401, { error: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }

    // So sánh mật khẩu (nếu được hash trong config, so sánh hash; nếu không, so sánh trực tiếp)
    const passwordMatch = user.password === password ||
                         user.password === hashPassword(password) ||
                         hashPassword(password) === user.password;

    if (!passwordMatch) {
      return jsonResponse(401, { error: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }

    // Tạo phiên mới
    const token = generateToken();
    const sessionsStore = getStore({ name: STORE_CONFIG.sessions, consistency: 'strong' });

    const sessionData = {
      token,
      username,
      role: user.role,
      name: user.name,
      createdAt: Date.now(),
      expiresAt: Date.now() + SESSION_TIMEOUT_MS
    };

    await sessionsStore.setJSON(`session_${token}`, sessionData);

    return jsonResponse(200, {
      success: true,
      token,
      user: {
        username,
        role: user.role,
        name: user.name
      },
      message: `Chào ${user.name}!`
    });
  } catch (error) {
    return jsonResponse(500, {
      error: error.message || 'Lỗi máy chủ',
      details: error.toString()
    });
  }
};
