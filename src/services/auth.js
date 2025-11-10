import api from './api';

const tokenKey = 'tlms_tokens';

export async function login(username, password) {
  const res = await api.post('token/', {username, password});
  localStorage.setItem(tokenKey, JSON.stringify(res.data));
  return res.data;
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getAuthHeaders() {
  const tokens = JSON.parse(localStorage.getItem(tokenKey) || 'null');
  if (!tokens) return {};
  return { Authorization: `Bearer ${tokens.access}` };
}

// You should also implement refresh token logic (call token/refresh/ when 401)
