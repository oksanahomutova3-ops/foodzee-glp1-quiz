'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export default function SuccessPage() {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const l = params.get('lang') || 'en';
    setLang(l);

    // Fire FB Pixel Purchase only after real Stripe success redirect
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Purchase', { value: 30.0, currency: 'USD' });
    }
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center',
        background: 'linear-gradient(180deg,#e8f7ee 0%,#ffffff 100%)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div style={{ fontSize: 64, marginBottom: 16 }}>✓</div>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12, color: '#0a7a3b' }}>
        Payment successful
      </h1>
      <p style={{ fontSize: 16, color: '#444', maxWidth: 360, marginBottom: 32 }}>
        Your personalized GLP-1 plan is on its way. Check your email for next steps.
      </p>
      <a
        href={`/${lang}`}
        style={{
          background: '#0a7a3b',
          color: '#fff',
          padding: '14px 28px',
          borderRadius: 999,
          fontWeight: 700,
          textDecoration: 'none',
          fontSize: 16,
        }}
      >
        Back to home
      </a>
    </div>
  );
}
