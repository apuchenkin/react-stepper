import { StepConfig, StepData, StepId, StepState } from './typings';

export type Resolve = (data: StepData) => void;
export type Reject = (message: string, description?: string) => void;
export type CreateStep = (stepId: StepId, config: StepConfig) => void;
export type UpdateStep = (stepId: StepId, state: Partial<StepState>) => void;
export type RemoveStep = (stepId: StepId) => void;
export type goAt = (stepId: StepId) => void;