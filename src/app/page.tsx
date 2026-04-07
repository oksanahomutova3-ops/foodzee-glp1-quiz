'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { NavProvider } from '../hooks/nav';
import { useStore } from '../store/store';
import {
  STEPS_BEFORE_BRANCH,
  BRANCH_STEPS,
  STEPS_AFTER_BRANCH,
  QuizStep,
} from '../AIPAGES/_config/quizFlow';

export default function QuizPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const { answers, saveAnswer, loadAnswer } = useStore();

  // Build flow dynamically based on status answer
  const flow: QuizStep[] = useMemo(() => {
    const status = answers['glpStatus'] || 'plan';
    const branchSteps = BRANCH_STEPS[status] || BRANCH_STEPS.plan;
    return [...STEPS_BEFORE_BRANCH, ...branchSteps, ...STEPS_AFTER_BRANCH];
  }, [answers]);

  const currentStep = flow[stepIndex];

  const onNext = useCallback(() => {
    // Save current answer to the step's storeKey
    if (currentStep?.storeKey) {
      saveAnswer(currentStep.storeKey);
    }
    setStepIndex((i) => Math.min(i + 1, flow.length - 1));
    // Load answer for next step
    const nextStep = flow[stepIndex + 1];
    if (nextStep?.storeKey) {
      loadAnswer(nextStep.storeKey);
    } else {
      loadAnswer('');
    }
  }, [currentStep, flow, stepIndex, saveAnswer, loadAnswer]);

  const onPrev = useCallback(() => {
    setStepIndex((i) => {
      const prev = Math.max(i - 1, 0);
      const prevStep = flow[prev];
      if (prevStep?.storeKey) {
        loadAnswer(prevStep.storeKey);
      } else {
        loadAnswer('');
      }
      return prev;
    });
  }, [flow, loadAnswer]);

  if (!currentStep) return null;

  const Component = currentStep.component;

  return (
    <NavProvider value={{ onNext, onPrev, currentIndex: stepIndex }}>
      <Component />
    </NavProvider>
  );
}
