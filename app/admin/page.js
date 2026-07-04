'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('admin_token') : null;

    if (token) {
      router.replace('/admin/dashboard');
    }
  }, [router]);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(result.error || 'Login failed');
      return;
    }

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('admin_token', 'authenticated');
    }

    router.push('/admin/dashboard');
  }

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#050816', color: 'white', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 420, padding: 32, borderRadius: 24, background: 'rgba(255,255,255,0.08)', boxShadow: '0 20px 60px rgba(0,0,0,0.35)' }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Admin Login</h1>
        <p style={{ marginBottom: 24, color: '#9fb3d1' }}>Sign in to manage your portfolio content.</p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" type="email" required style={{ padding: '12px 14px', borderRadius: 12, border: '1px solid #2f3f61', background: '#0b1428', color: 'white' }} />
          <input value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" type="password" required style={{ padding: '12px 14px', borderRadius: 12, border: '1px solid #2f3f61', background: '#0b1428', color: 'white' }} />
          {error ? <p style={{ color: '#ff7b7b' }}>{error}</p> : null}
          <button type="submit" disabled={loading} style={{ padding: '12px 16px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #5ee7df, #b490ca)', color: '#07111f', fontWeight: 700, cursor: 'pointer' }}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>
    </main>
  );
}
