import * as React from "react";
import { Context } from "./context";
import { StepConfig, StepId } from "./typings";

interface Props extends StepConfig {
  stepId: StepId;
  data?: any;
  loading?: boolean;
  disabled?: boolean;
}

const Step: React.FunctionComponent<Props> = ({ stepId, ...props }) => {
  const { createStep, removeStep, updateStep } = React.useContext(Context);

  React.useEffect(() => {
    createStep(stepId, props);

    return () => removeStep(stepId);
  }, []);

  React.useEffect(() => {
    updateStep(stepId, {
      loading: props.loading
    });
  }, [props.loading]);

  return null;
};

export default React.memo(Step);
