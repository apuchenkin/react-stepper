import StepError from './error';

export type StepId = number | string;

export type StepData = any;

export interface StepConfig {
  title: string;
  children: React.ReactChild;
  description?: string;
  loading?: boolean;
  disabled?: boolean;
  data?: StepData;
  className?: string;
  index?: number;
}

export interface StepState extends StepConfig {
  stepId: StepId;
  error?: StepError;
  completed?: boolean;
  loading: boolean;
}
