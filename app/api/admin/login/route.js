import { NextResponse } from 'next/server';
import { createSessionToken, verifyAdminCredentials } from '@/lib/admin-auth';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body || {};

    if (!verifyAdminCredentials(email, password)) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_token', createSessionToken(email), {
      httpOnly: false,
      sameSite: 'lax',
      secure: false,
      path: '/',
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
