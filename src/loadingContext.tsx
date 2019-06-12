import * as React from "react";

type IsLoading = (stepIndex: number) => boolean;
type SetLoading = (stepIndex: number, loading: boolean) => void;

interface ContextProps {
  isLoading: IsLoading;
  setLoading: SetLoading;
}

export const LoadingContext = React.createContext<ContextProps>({
  isLoading: () => false,
  setLoading: () => undefined
});

interface Action {
  stepIndex: number;
  loading: boolean;
}

interface State {
  [key: number]: boolean;
}

const reducer = (state: State, action: Action) => {
  return {
    ...state,
    [action.stepIndex]: action.loading
  };
};

const LoadingProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, {});

  const isLoading: IsLoading = stepIndex => state[stepIndex] || false;

  const setLoading: SetLoading = (stepIndex, loading) =>
    dispatch({
      loading,
      stepIndex
    });

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setLoading
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
