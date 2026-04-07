'use client';
import React, { useState } from 'react';

interface CheckProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
}

export function Check({ defaultValue, onChange, children }: CheckProps) {
  const [selected, setSelected] = useState(defaultValue ?? '');

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child as React.ReactElement<any>, {
          _selected: selected,
          _onSelect: handleSelect,
        });
      })}
    </div>
  );
}
