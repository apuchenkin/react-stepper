export type StepId = number | string;

export type StepError = Error;

type StepData = any;

export interface StepConfig {
  title: string;
  children: React.ReactChild;
  description?: string;
  loading?: boolean;
  disabled?: boolean;
  data?: StepData;
  className?: string;
}

export interface StepState extends StepConfig {
  stepId: StepId;
  error?: StepError;
  completed?: boolean;
  loading: boolean;
}

export namespace Actions {
  export type Resolve = (data: StepData) => void;
  export type Reject = (error: StepError) => void;
  export type CreateStep = (stepId: StepId, config: StepConfig) => void;
  export type UpdateStep = (stepId: StepId, state: Partial<StepState>) => void;
  export type RemoveStep = (stepId: StepId) => void;
  export type goAt = (stepId: StepId) => void;
}

export namespace Selectors {
  export type IsLoading = () => boolean;
  export type GetSteps = () => StepState[];
  export type GetCurrentStep = () => StepState | undefined;
  export type GetStep = (stepId: StepId) => StepState | undefined;
  export type GetData = (stepId: StepId, fallback?: StepData) => StepData;
}

export namespace Handlers {
  export type OnResolve = (context: StepperController) => void;
  export type OnReject = (context: StepperController) => void;
}

export interface StepperController {
  createStep: Actions.CreateStep;
  removeStep: Actions.RemoveStep;
  updateStep: Actions.UpdateStep;
  goAt: Actions.goAt;
  resolve: Actions.Resolve;
  reject: Actions.Reject;
  isLoading: Selectors.IsLoading;
  getSteps: Selectors.GetSteps;
  getCurrentStep: Selectors.GetCurrentStep;
  getStep: Selectors.GetStep;
  getData: Selectors.GetData;
}
