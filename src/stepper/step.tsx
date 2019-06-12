import * as React from "react";
import { Context, StepConfig } from "./context";

interface Props extends StepConfig {
  data?: any;
  loading?: boolean;
  disabled?: boolean;
}

const Step: React.FunctionComponent<Props> = props => {
  const [stepId, setStepId] = React.useState(null);
  const { createStep, removeStep, updateStep } = React.useContext(Context);

  React.useEffect(() => {
    createStep(props).then(setStepId);

    return () => stepId && removeStep(stepId);
  }, []);

  React.useEffect(() => {
    if (stepId) {
      updateStep(stepId, {
        loading: props.loading
      });
    }
  }, [props.loading]);

  return null;
};

export default Step;
