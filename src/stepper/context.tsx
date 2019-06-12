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
  export type CreateStep = (config: StepConfig) => Promise<StepIndex>;
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
  export type GetData = (index: StepIndex) => StepData | undefined;
}

export interface StepperContext {
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

export const Context = React.createContext<StepperContext>({
  isLoading: () => false,
  createStep: contextFallback,
  removeStep: contextFallback,
  updateStep: contextFallback,
  goAt: contextFallback,
  resolve: contextFallback,
  reject: contextFallback,
  getSteps: () => [],
  getCurrentStep: () => undefined,
  getStep: () => undefined,
  getData: () => undefined
});

interface Props {
  children: (context: StepperContext) => React.ReactNode;
  onComplete: (context: StepperContext) => void;
  initialStep?: number;
}

interface State {
  current: StepIndex;
  index: StepIndex;
  steps: {
    [key: number]: StepState;
  };
}

const StepperPorvider: React.FunctionComponent<Props> = ({
  initialStep = 1,
  onComplete,
  children
}) => {
  const [state, setState] = useStateEffects<State>({
    current: initialStep,
    index: 1,
    steps: {}
  });

  const createStep: Actions.CreateStep = config => {
    return new Promise(resolve => {
      setState(state => [
        {
          ...state,
          steps: {
            ...state.steps,
            [state.index]: {
              ...config,
              index: state.index,
              completed: state.current > state.index,
              data: config.data,
              loading: false,
            }
          },
          index: state.index + 1
        },
        () => resolve(state.index)
      ]);
    });
  };

  const removeStep: Actions.RemoveStep = stepId => {
    setState(state => [
      {
        ...state,
        steps: Object.keys(state.steps).reduce(
          (acc, id) =>
            Number(id) === stepId
              ? acc
              : { ...acc, [id]: state.steps[Number(id)] },
          {}
        )
      }
    ]);
  };

  const updateStep: Actions.UpdateStep = (index, stepState) =>
    setState(state => [
      {
        ...state,
        steps: {
          ...state.steps,
          [index]: {
            ...state.steps[index],
            ...stepState
          }
        }
      }
    ]);

  const goAt: Actions.goAt = index =>
    setState(state => [
      {
        ...state,
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

  const getData: Selectors.GetData = index => {
    const state = getStep(index);
    return state && state.data;
  };

  const resolve: Actions.Resolve = data => {
    setState(({ current, steps, ...state }) => [
      {
        ...state,
        current: current + 1,
        steps: {
          ...steps,
          [current]: {
            ...steps[current],
            data,
            completed: true,
            error: undefined
          }
        }
      },
      () => {
        const ctx = contextRef.current;
        const steps = ctx.getSteps();
        console.log(steps);

        // TODO: Probably we would like to excecute onComplete immediately after resolve, howewer without state change
        // Do we even nned onComplete in this case?
        if (steps.length && steps.every(step => step.completed)) {
          onComplete(ctx);
        }
      }
    ]);
  };

  const reject: Actions.Reject = error =>
    setState(({ current, steps, ...state }) => [
      {
        ...state,
        current: current,
        steps: {
          ...steps,
          [current]: {
            ...steps[current],
            completed: false,
            error
          }
        }
      }
    ]);

  const context = {
    isLoading,
    createStep,
    removeStep,
    updateStep,
    getSteps,
    getStep,
    getCurrentStep,
    goAt,
    resolve,
    reject,
    getData
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
