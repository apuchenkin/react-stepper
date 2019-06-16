import { StepData, StepId, StepState } from './typings';

export type IsLoading = () => boolean;
export type GetSteps = () => StepState[];
export type GetCurrentStep = () => StepState | undefined;
export type GetStep = (stepId: StepId) => StepState | undefined;
export type GetData = (stepId: StepId, fallback?: StepData) => StepData;