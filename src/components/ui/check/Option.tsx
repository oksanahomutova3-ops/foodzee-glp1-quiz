'use client';
import React from 'react';

interface OptionProps {
  value: string;
  children: React.ReactNode;
  _selected?: string;
  _onSelect?: (v: string) => void;
}

const base: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '16px 20px',
  borderRadius: '16px',
  border: '2px solid #e0e0e0',
  background: '#fff',
  cursor: 'pointer',
  fontFamily: "'Inter', sans-serif",
  fontSize: '16px',
  fontWeight: 600,
  color: '#1a1a1a',
  transition: 'all 0.15s',
};

const activeStyle: React.CSSProperties = {
  ...base,
  border: '2px solid #1a1a1a',
  background: '#f5f5f5',
};

export function Option({ value, children, _selected, _onSelect }: OptionProps) {
  const isActive = _selected === value;
  return (
    <div style={isActive ? activeStyle : base} onClick={() => _onSelect?.(value)}>
      {children}
    </div>
  );
}
