import * as React from "react";
import useStateEffects from "react-state-effects";
import * as Actions from './actions';
import StepError from "./error";
import * as Selectors from './selectors';

import {
  StepId,
  StepState
} from "./typings";

const contextFallback = () => {
  throw new Error("createStep invoked outside of Stepper scope");
};

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


export type OnResolve = (context: StepperController) => void;
export type OnReject = (context: StepperController) => void;

interface Props {
  children: (context: StepperController) => React.ReactNode;
  onResolve?: OnResolve;
  onReject?: OnReject;
  initialStep?: StepId;
}

interface State {
  current: StepId;
  steps: Record<StepId, StepState>;
  stepIndex: StepId[];
}

const StepperPorvider: React.FunctionComponent<Props> = ({
  initialStep = 1,
  onResolve,
  onReject,
  children
}) => {
  const [state, setState] = useStateEffects<State>({
    current: initialStep,
    stepIndex: [],
    steps: {}
  });

  const getIndex = (stepId: StepId) => state.stepIndex.indexOf(stepId);
  const getNextStepId = (stepId: StepId) => {
    const index = getIndex(stepId);
    const nextIndex =
      index + 1 < state.stepIndex.length ? index + 1 : state.stepIndex.length;

    return state.stepIndex[nextIndex];
  };

  const createStep: Actions.CreateStep = (stepId, config) => {
    setState(state$ => [
      {
        ...state$,
        stepIndex: [...state$.stepIndex, stepId],
        steps: {
          ...state$.steps,
          [stepId]: {
            ...config,
            completed:
              state$.stepIndex.indexOf(state$.current) < 0 &&
              state$.current !== stepId,
            data: config.data,
            loading: false,
            stepId
          }
        }
      }
    ]);
  };

  const removeStep: Actions.RemoveStep = stepId => {
    setState(state$ => [
      {
        ...state$,
        stepIndex: state$.stepIndex.filter(stepId$ => stepId$ !== stepId),
        steps: Object.keys(state$.steps).reduce(
          (acc, id) =>
            Number(id) === stepId ? acc : { ...acc, [id]: state$.steps[id] },
          {}
        )
      }
    ]);
  };

  const updateStep: Actions.UpdateStep = (stepId, stepState) =>
    setState(state$ => [
      {
        ...state$,
        steps: {
          ...state$.steps,
          [stepId]: {
            ...state$.steps[stepId],
            ...stepState
          }
        }
      }
    ]);

  const goAt: Actions.goAt = stepId =>
    setState(state$ => [
      {
        ...state$,
        current: stepId
      }
    ]);

  const getSteps: Selectors.GetSteps = () => {
    return state.stepIndex.map(stepId => state.steps[stepId]);
  };

  const isLoading = () => getSteps().some(step => step.loading);

  const getStep: Selectors.GetStep = stepId => state.steps[stepId];

  const getCurrentStep: Selectors.GetCurrentStep = () => getStep(state.current);

  const getData: Selectors.GetData = (stepId, fallback) => {
    const stepState = getStep(stepId);
    return (stepState && stepState.data) || fallback;
  };

  const resolve: Actions.Resolve = data => {
    setState(({ current, steps, ...state$ }) => [
      {
        ...state$,
        current: getNextStepId(current),
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
      onResolve && (() => onResolve(contextRef.current))
    ]);
  };

  const reject: Actions.Reject = (message, description) =>
    setState(({ current, steps, ...state$ }) => [
      {
        ...state$,
        current,
        steps: {
          ...steps,
          [current]: {
            ...steps[current],
            completed: false,
            error: new StepError(message, description)
          }
        }
      },
      onReject && (() => onReject(contextRef.current))
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
