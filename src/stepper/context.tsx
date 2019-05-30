import * as React from "react";

export type Index = number;

export type StepError = Error;

export type StepId = number;

export interface StepData {}

export interface StepConfig {
  title: string;
  children: React.ReactChild;
  index?: Index;
  stepId?: StepId;
  disabled?: boolean;
  completed?: boolean;
  error?: StepError;
  data?: StepData;
}

export namespace Actions {
  export type Resolve = (data: StepData) => void;
  export type Reject = (error: StepError) => void;
  export type SetData = (data: StepData) => void;
  export type CreateStep = (config: StepConfig) => Promise<StepId>;
  export type RemoveStep = (stepId: StepId) => void;
  export type Go = (index: Index) => void;
}

export namespace Selectors {
  export type GetSteps = () => StepConfig[];
  export type GetCurrentStep = () => StepConfig | undefined;
}

interface StepperContext {
  isLoading: boolean;
  createStep: Actions.CreateStep;
  removeStep: Actions.RemoveStep;
  go: Actions.Go;
  getSteps: Selectors.GetSteps;
  getCurrentStep: Selectors.GetCurrentStep;
}

export const Context = React.createContext<StepperContext>({
  isLoading: false,
  createStep: () => {
    throw new Error("createStep invoked outside of Stepper scope");
  },
  removeStep: () => {
    throw new Error("createStep invoked outside of Stepper scope");
  },
  go: () => {
    throw new Error("createStep invoked outside of Stepper scope");
  },
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
    [key: number]: StepConfig,
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
            [state.index]: config,
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


  const go: Actions.Go = index => {
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

  const context = {
    isLoading,
    createStep,
    removeStep,
    getSteps,
    getCurrentStep,
    go,
  };

  return (
    <Context.Provider value={context}>{children(context)}</Context.Provider>
  );
};

export default StepperPorvider;
