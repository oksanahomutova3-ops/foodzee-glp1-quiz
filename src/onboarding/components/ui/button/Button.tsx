'use client';
import React from 'react';

const style: React.CSSProperties = {
  width: '100%',
  padding: '16px 24px',
  borderRadius: '16px',
  border: 'none',
  background: '#1a1a1a',
  color: '#fff',
  fontSize: '17px',
  fontWeight: 700,
  fontFamily: "'Inter', sans-serif",
  cursor: 'pointer',
  transition: 'opacity 0.2s',
};

export default function Button({ children, onClick, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button style={style} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
