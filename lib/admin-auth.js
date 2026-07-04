const crypto = require('crypto');

function getEnvValue(...names) {
  for (const name of names) {
    const value = process.env[name];
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }
  return '';
}

const ADMIN_EMAIL = getEnvValue('ADMIN_EMAIL', 'EMAIL', 'admin@example.com');
const ADMIN_PASSWORD = getEnvValue('ADMIN_PASSWORD', 'PASSWORD', 'admin123');
const SESSION_SECRET = getEnvValue('ADMIN_SESSION_SECRET', 'SESSION_SECRET', 'portfolio-admin-secret');

function verifyAdminCredentials(email, password) {
  const expectedEmail = ADMIN_EMAIL.toLowerCase();
  const expectedPassword = ADMIN_PASSWORD === 'your_admin_password' || ADMIN_PASSWORD === 'changeme' ? 'admin123' : ADMIN_PASSWORD;
  const suppliedPassword = password || '';

  return email?.trim().toLowerCase() === expectedEmail && suppliedPassword === expectedPassword;
}

function createSessionToken(email) {
  const payload = Buffer.from(JSON.stringify({ email: email.trim().toLowerCase() })).toString('base64url');
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

function parseSessionToken(token) {
  if (!token) return null;
  const [payload] = token.split('.');
  if (!payload) return null;
  try {
    const decoded = Buffer.from(payload, 'base64url').toString('utf8');
    return JSON.parse(decoded).email?.toLowerCase() || null;
  } catch {
    return null;
  }
}

function verifySessionToken(token) {
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;
  const expected = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

module.exports = {
  verifyAdminCredentials,
  createSessionToken,
  parseSessionToken,
  verifySessionToken,
};
