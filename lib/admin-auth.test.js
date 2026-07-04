const test = require('node:test');
const assert = require('node:assert/strict');
const { verifyAdminCredentials, createSessionToken, parseSessionToken } = require('./admin-auth');

test('verifyAdminCredentials accepts configured admin credentials', () => {
  assert.equal(verifyAdminCredentials('admin@example.com', 'admin123'), true);
});

test('parseSessionToken returns the normalized email from a session token', () => {
  const token = createSessionToken('Admin@Example.com');
  assert.equal(parseSessionToken(token), 'admin@example.com');
});
