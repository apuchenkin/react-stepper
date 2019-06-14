import * as React from "react";
import useStateEffects from "react-state-effects";

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

// tslint:disable-next-line:no-namespace
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

// tslint:disable-next-line:no-namespace
export namespace Selectors {
  export type IsLoading = () => boolean;
  export type GetSteps = () => StepState[];
  export type GetCurrentStep = () => StepState | undefined;
  export type GetStep = (index: StepIndex) => StepState | undefined;
  export type GetData = (index: StepIndex, fallback?: StepData) => StepData;
}

// tslint:disable-next-line:no-namespace
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

const contextFallback = () => {
  throw new Error("createStep invoked outside of Stepper scope");
};

export const Context = React.createContext<StepperController>({
  createStep: contextFallback,
  getCurrentStep: () => undefined,
  getData: () => undefined,
  getStep: () => undefined,
  getSteps: () => [],
  goAt: contextFallback,
  isLoading: () => false,
  reject: contextFallback,
  removeStep: contextFallback,
  resolve: contextFallback,
  updateStep: contextFallback
});

interface Props {
  children: (context: StepperController) => React.ReactNode;
  onResolve: Handlers.OnResolve;
  onReject: Handlers.OnReject;
  initialStep?: StepIndex;
}

interface State {
  current: StepIndex;
  steps: {
    [key: number]: StepState;
  };
}

const StepperPorvider: React.FunctionComponent<Props> = ({
  initialStep = 1,
  onResolve,
  onReject,
  children
}) => {
  const [state, setState] = useStateEffects<State>({
    current: initialStep,
    steps: {}
  });

  const createStep: Actions.CreateStep = (index, config) => {
    setState(state$ => [
      {
        ...state$,
        steps: {
          ...state$.steps,
          [index]: {
            ...config,
            completed: state$.current > index,
            data: config.data,
            index,
            loading: false
          }
        }
      }
    ]);
  };

  const removeStep: Actions.RemoveStep = stepId => {
    setState(state$ => [
      {
        ...state$,
        steps: Object.keys(state$.steps).reduce(
          (acc, id) =>
            Number(id) === stepId
              ? acc
              : { ...acc, [id]: state$.steps[Number(id)] },
          {}
        )
      }
    ]);
  };

  const updateStep: Actions.UpdateStep = (index, stepState) =>
    setState(state$ => [
      {
        ...state$,
        steps: {
          ...state$.steps,
          [index]: {
            ...state$.steps[index],
            ...stepState
          }
        }
      }
    ]);

  const goAt: Actions.goAt = index =>
    setState(state$ => [
      {
        ...state$,
        current: index
      }
    ]);

  const getSteps: Selectors.GetSteps = () => {
    return Object.keys(state.steps).reduce(
      (acc, id) => [...acc, state.steps[Number(id)]],
      []
    );
  };

  const isLoading = () => getSteps().some(step => step.loading);

  const getStep: Selectors.GetStep = index => state.steps[index];

  const getCurrentStep: Selectors.GetCurrentStep = () => getStep(state.current);

  const getData: Selectors.GetData = (index, fallback) => {
    const stepState = getStep(index);
    return (stepState && stepState.data) || fallback;
  };

  const resolve: Actions.Resolve = data => {
    setState(({ current, steps, ...state$ }) => [
      {
        ...state$,
        // TODO: getNext
        current: current + 1,
        steps: {
          ...steps,
          [current]: {
            ...steps[current],
            completed: true,
            data,
            error: undefined
          }
        }
      },
      () => onResolve(contextRef.current),
    ]);
  };

  const reject: Actions.Reject = error =>
    setState(({ current, steps, ...state$ }) => [
      {
        ...state$,
        current,
        steps: {
          ...steps,
          [current]: {
            ...steps[current],
            completed: false,
            error
          }
        }
      },
      () => onReject(contextRef.current),
    ]);

  const context = {
    createStep,
    getCurrentStep,
    getData,
    getStep,
    getSteps,
    goAt,
    isLoading,
    reject,
    removeStep,
    resolve,
    updateStep
  };

  const contextRef = React.useRef(context);

  React.useEffect(() => {
    contextRef.current = context;
  }, [state]);

  return (
    <Context.Provider value={context}>{children(context)}</Context.Provider>
  );
};

export default StepperPorvider;
