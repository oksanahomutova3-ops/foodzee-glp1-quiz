'use client';
import React, { createContext, useContext } from 'react';

interface NavCtx {
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
}

export const NavContext = createContext<NavCtx>({
  onNext: () => {},
  onPrev: () => {},
  currentIndex: 0,
});

export function useNav() {
  return useContext(NavContext);
}

export function NavProvider({ children, value }: { children: React.ReactNode; value: NavCtx }) {
  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}
