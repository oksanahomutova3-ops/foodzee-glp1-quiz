/* eslint-disable */
/**
 * GLP-1 Quiz Flow Configuration
 * 
 * This file defines the page order and conditional branching.
 * The router should use this config to determine which pages to show.
 * 
 * Branch logic: GlpStatus answer determines which Branch1/Branch2/BranchInfo pages to show.
 *   status === "plan"    → GlpBranch1Plan    → GlpBranch2Plan    → GlpBranchInfoPlan
 *   status === "taking"  → GlpBranch1Taking  → GlpBranch2Taking  → GlpBranchInfoTaking
 *   status === "stopped" → GlpBranch1Stopped → GlpBranch2Stopped → GlpBranchInfoStopped
 */

import GlpWelcome from '../GlpWelcome';
import GlpStatus from '../GlpStatus';
import GlpGoal from '../GlpGoal';
import GlpAge from '../GlpAge';
import GlpBranch1Plan from '../GlpBranch1Plan';
import GlpBranch1Taking from '../GlpBranch1Taking';
import GlpBranch1Stopped from '../GlpBranch1Stopped';
import GlpBranch2Plan from '../GlpBranch2Plan';
import GlpBranch2Taking from '../GlpBranch2Taking';
import GlpBranch2Stopped from '../GlpBranch2Stopped';
import GlpBranchInfoPlan from '../GlpBranchInfoPlan';
import GlpBranchInfoTaking from '../GlpBranchInfoTaking';
import GlpBranchInfoStopped from '../GlpBranchInfoStopped';
import GlpWeight from '../GlpWeight';
import GlpGoalWeight from '../GlpGoalWeight';
import GlpActivity from '../GlpActivity';
import GlpWater from '../GlpWater';
import GlpMeals from '../GlpMeals';
import GlpDiet from '../GlpDiet';
import GlpCooking from '../GlpCooking';
import GlpTestimonials from '../GlpTestimonials';
import GlpAnalyzing from '../GlpAnalyzing';
import GlpProjection from '../GlpProjection';
import GlpPaywall from '../GlpPaywall';

export interface QuizStep {
  id: string;
  component: React.ComponentType;
  storeKey?: string; // field name in store for this step's answer
}

/**
 * Shared steps shown before branching
 */
export const STEPS_BEFORE_BRANCH: QuizStep[] = [
  { id: 'welcome', component: GlpWelcome },
  { id: 'status', component: GlpStatus, storeKey: 'glpStatus' },
  { id: 'goal', component: GlpGoal, storeKey: 'glpGoal' },
  { id: 'age', component: GlpAge, storeKey: 'glpAge' },
];

/**
 * Branch-specific steps (determined by status answer)
 */
export const BRANCH_STEPS: Record<string, QuizStep[]> = {
  plan: [
    { id: 'branch1Plan', component: GlpBranch1Plan, storeKey: 'glpBranch1' },
    { id: 'branch2Plan', component: GlpBranch2Plan, storeKey: 'glpBranch2' },
    { id: 'branchInfoPlan', component: GlpBranchInfoPlan },
  ],
  taking: [
    { id: 'branch1Taking', component: GlpBranch1Taking, storeKey: 'glpBranch1' },
    { id: 'branch2Taking', component: GlpBranch2Taking, storeKey: 'glpBranch2' },
    { id: 'branchInfoTaking', component: GlpBranchInfoTaking },
  ],
  stopped: [
    { id: 'branch1Stopped', component: GlpBranch1Stopped, storeKey: 'glpBranch1' },
    { id: 'branch2Stopped', component: GlpBranch2Stopped, storeKey: 'glpBranch2' },
    { id: 'branchInfoStopped', component: GlpBranchInfoStopped },
  ],
};

/**
 * Shared steps shown after branching
 */
export const STEPS_AFTER_BRANCH: QuizStep[] = [
  { id: 'weight', component: GlpWeight, storeKey: 'glpWeight' },
  { id: 'goalWeight', component: GlpGoalWeight, storeKey: 'glpGoalWeight' },
  { id: 'activity', component: GlpActivity, storeKey: 'glpActivity' },
  { id: 'water', component: GlpWater, storeKey: 'glpWater' },
  { id: 'meals', component: GlpMeals, storeKey: 'glpMeals' },
  { id: 'diet', component: GlpDiet, storeKey: 'glpDiet' },
  { id: 'cooking', component: GlpCooking, storeKey: 'glpCooking' },
  { id: 'testimonials', component: GlpTestimonials },
  { id: 'analyzing', component: GlpAnalyzing },
  { id: 'projection', component: GlpProjection },
  { id: 'paywall', component: GlpPaywall },
];

/**
 * Build the full quiz flow based on the status answer.
 * Call this after the user answers the status question.
 */
export function buildQuizFlow(statusAnswer: string): QuizStep[] {
  const branchSteps = BRANCH_STEPS[statusAnswer] || BRANCH_STEPS.plan;
  return [
    ...STEPS_BEFORE_BRANCH,
    ...branchSteps,
    ...STEPS_AFTER_BRANCH,
  ];
}

/**
 * Default flow (before status is known, shows "plan" branch)
 */
export const DEFAULT_FLOW = buildQuizFlow('plan');
