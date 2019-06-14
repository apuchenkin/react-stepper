import * as React from "react";
import { Context, StepConfig, StepIndex } from "./context";

interface Props extends StepConfig {
  index: StepIndex;
  data?: any;
  loading?: boolean;
  disabled?: boolean;
}

const Step: React.FunctionComponent<Props> = ({ index, ...props }) => {
  const { createStep, removeStep, updateStep } = React.useContext(Context);

  React.useEffect(() => {
    createStep(index, props);

    return () => removeStep(index);
  }, []);

  React.useEffect(() => {
    if (index) {
      updateStep(index, {
        loading: props.loading
      });
    }
  }, [props.loading]);

  return null;
};

export default Step;
