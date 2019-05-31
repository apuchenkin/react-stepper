import * as React from "react";

export type StepIndex = number;

export type StepError = Error;

export interface StepData {}

export interface StepConfig {
  title: string;
  children: React.ReactChild;
}

export interface StepState {
  index: StepIndex;
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
  export type CreateStep = (config: StepConfig) => Promise<StepIndex>;
  export type RemoveStep = (index: StepIndex) => void;
  export type goAt = (index: StepIndex) => void;
}

export namespace Selectors {
  export type GetSteps = () => StepState[];
  export type GetCurrentStep = () => StepState | undefined;
  export type GetStep = (index: StepIndex) => StepState | undefined;
  export type GetData = (index: StepIndex) => StepData | undefined;
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
  getStep: Selectors.GetStep;
  getData: Selectors.GetData;
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
  getStep: () => undefined,
  getData: () => undefined,
});

interface Props {
  children: (context: StepperContext) => React.ReactNode;
}

interface State {
  current: StepIndex,
  index: StepIndex,
  steps: {
    [key: number]: StepState,
  },
}

const StepperPorvider: React.FunctionComponent<Props> = ({ children }) => {
  const isLoading = false;
  const [state, setState] = React.useState<State>({
    current: 1,
    index: 1,
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

  const getStep: Selectors.GetStep = index => state.steps[index];

  const getCurrentStep: Selectors.GetCurrentStep = () => getStep(state.current);

  const getData: Selectors.GetData = index => {
    const state = getStep(index);
    return state && state.data;
  };

  const resolve: Actions.Resolve = (data) => {
    console.log(state.current);

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
    getStep,
    getCurrentStep,
    goAt,
    resolve,
    reject,
    getData,
  };

  return (
    <Context.Provider value={context}>{children(context)}</Context.Provider>
  );
};

export default StepperPorvider;
