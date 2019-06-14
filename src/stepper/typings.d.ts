
export type StepIndex = number;

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
  index: StepIndex;
  error?: StepError;
  completed?: boolean;
  loading: boolean;
}

export namespace Actions {
  export type Resolve = (data: StepData) => void;
  export type Reject = (error: StepError) => void;
  export type CreateStep = (index: StepIndex, config: StepConfig) => void;
  export type UpdateStep = (
    index: StepIndex,
    state: Partial<StepState>
  ) => void;
  export type RemoveStep = (index: StepIndex) => void;
  export type goAt = (index: StepIndex) => void;
}

export namespace Selectors {
  export type IsLoading = () => boolean;
  export type GetSteps = () => StepState[];
  export type GetCurrentStep = () => StepState | undefined;
  export type GetStep = (index: StepIndex) => StepState | undefined;
  export type GetData = (index: StepIndex, fallback?: StepData) => StepData;
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
