import * as React from "react";
import useStateEffects from "react-state-effects";
import * as Actions from "./actions";
import StepError from "./error";
import * as Selectors from "./selectors";

import { StepId, StepState } from "./typings";

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

export type OnResolve = (stepId: StepId) => void;
export type OnReject = (stepId: StepId) => void;

interface Props {
  children: (context: StepperController) => React.ReactNode;
  contextRef?: React.MutableRefObject<StepperController>;
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
  initialStep,
  onResolve,
  onReject,
  contextRef,
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
      index + 1 < state.stepIndex.length ? index + 1 : index;

    return state.stepIndex[nextIndex];
  };

  const createStep: Actions.CreateStep = (stepId, config) => {
    setState(state$ => {
      const stepState = state$.steps[stepId] || config;
      const index = stepState.index || state$.stepIndex.length;
      const current = state$.current || stepId;
      const completed = state$.stepIndex.indexOf(state$.current) < 0
        && current !== stepId;

      return [
        {
          ...state$,
          current,
          stepIndex: [
            ...state$.stepIndex.slice(0, index),
            stepId,
            ...state$.stepIndex.slice(index),
          ],
          steps: {
            ...state$.steps,
            [stepId]: {
              completed,
              index,
              loading: false,
              stepId,
              ...stepState,
            }
          }
        }
      ]
    });
  };

  const removeStep: Actions.RemoveStep = stepId => {
    setState(state$ => [
      {
        ...state$,
        stepIndex: state$.stepIndex.filter(stepId$ => stepId$ !== stepId),
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
      onResolve && (() => onResolve(current))
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
      onReject && (() => onReject(current))
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

  if (contextRef) {
    React.useEffect(() => {
      contextRef.current = context;
    }, [state]);
  }

  return (
    <Context.Provider value={context}>{children(context)}</Context.Provider>
  );
};

export default StepperPorvider;
