import * as React from "react";

export type Index = number;

export type StepError = Error;

export type StepId = number;

export interface StepData {}

export interface StepConfig {
  title: string;
  children: React.ReactChild;
}

export interface StepState {
  index: Index;
  data?: StepData;
  error?: StepError;
  disabled?: boolean;
  completed?: boolean;
  config: StepConfig;
}

export namespace Actions {
  export type Resolve = (data: StepData) => void;
  export type Reject = (error: StepError) => void;
  export type SetData = (data: StepData) => void;
  export type CreateStep = (config: StepConfig) => Promise<StepId>;
  export type RemoveStep = (stepId: StepId) => void;
  export type goAt = (index: Index) => void;
}

export namespace Selectors {
  export type GetSteps = () => StepState[];
  export type GetCurrentStep = () => StepState | undefined;
}

interface StepperContext {
  isLoading: boolean;
  createStep: Actions.CreateStep;
  removeStep: Actions.RemoveStep;
  goAt: Actions.goAt;
  resolve: Actions.Resolve;
  reject: Actions.Reject;
  getSteps: Selectors.GetSteps;
  getCurrentStep: Selectors.GetCurrentStep;
}

const contextFallback = () => {
  throw new Error("createStep invoked outside of Stepper scope");
};

export const Context = React.createContext<StepperContext>({
  isLoading: false,
  createStep: contextFallback,
  removeStep: contextFallback,
  goAt: contextFallback,
  resolve: contextFallback,
  reject: contextFallback,
  getSteps: () => [],
  getCurrentStep: () => undefined,
});

interface Props {
  children: (context: StepperContext) => React.ReactNode;
}

interface State {
  current: StepId,
  index: StepId,
  steps: {
    [key: number]: StepState,
  },
}

const StepperPorvider: React.FunctionComponent<Props> = ({ children }) => {
  const isLoading = false;
  const [state, setState] = React.useState<State>({
    current: 0,
    index: 0,
    steps: {}
  });

  const createStep: Actions.CreateStep = config => {
    return new Promise((resolve) => {
      setState(state => {
        resolve(state.index);

        return ({
          ...state,
          steps: {
            ...state.steps,
            [state.index]: {
              config,
              index: state.index,
            }
          },
          index: state.index + 1,
        });
      });
    })

  };

  const removeStep: Actions.RemoveStep = stepId => {
    console.log(stepId);

    setState(state => ({
      ...state,
      steps: Object.keys(state.steps).reduce(
        (acc, id) => Number(id) === stepId ? acc : ({ ...acc, [id]: state.steps[Number(id)] }),
        {},
      ),
    }));
  };


  const goAt: Actions.goAt = index => {
    setState(state => ({
      ...state,
      current: index,
    }))
  };

  const getSteps: Selectors.GetSteps = () => {
    return Object.keys(state.steps).reduce(
      (acc, id) => [...acc, state.steps[Number(id)]],
      [],
    );
  };

  const getCurrentStep: Selectors.GetCurrentStep = () => {
    return state.steps[state.current]
  };

  const resolve: Actions.Resolve = (data) => {
    setState(({ current, steps, ...state }) => ({
      ...state,
      current: current + 1,
      steps: {
        ...steps,
        [current]: {
          ...steps[current],
          data,
          completed: true,
          error: undefined,
        }
      },
    }));
  };

  const reject: Actions.Reject = (error) => {
    setState(({ current, steps, ...state }) => ({
      ...state,
      current: current - 1,
      steps: {
        ...steps,
        [current]: {
          ...steps[current],
          completed: false,
          error,
        }
      },
    }));
  };

  const context = {
    isLoading,
    createStep,
    removeStep,
    getSteps,
    getCurrentStep,
    goAt,
    resolve,
    reject,
  };

  return (
    <Context.Provider value={context}>{children(context)}</Context.Provider>
  );
};

export default StepperPorvider;
