'use client';
import { create } from 'zustand';

interface QuizStore {
  answers: Record<string, string>;
  answer: string;          // current step answer
  setAnswer: (v: string) => void;
  saveAnswer: (key: string) => void;
  loadAnswer: (key: string) => void;
}

export const useStore = create<QuizStore>((set, get) => ({
  answers: {},
  answer: '',
  setAnswer: (v) => set({ answer: v }),
  saveAnswer: (key) => {
    if (key && get().answer) {
      set((s) => ({ answers: { ...s.answers, [key]: s.answer } }));
    }
  },
  loadAnswer: (key) => {
    set({ answer: key ? get().answers[key] ?? '' : '' });
  },
}));
