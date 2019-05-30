import * as React from "react";
import { Context, StepConfig, StepId } from "./context";

interface Props extends StepConfig {}

const Step: React.FunctionComponent<Props> = props => {
  const [stepId, setStepId] = React.useState(null);
  const { createStep, removeStep } = React.useContext(Context);

  const onMount = React.useMemo(() => {
    createStep(props).then(setStepId);
  }, []);

  const onUnmount = React.useMemo(() => {
    return () => stepId && removeStep(stepId);
  }, []);

  return null;
};

export default Step;
