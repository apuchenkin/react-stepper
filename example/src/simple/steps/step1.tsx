import * as React from "react";
import { StepperAction, StepperContent, StepperContext } from "react-material-stepper";
import { LoadingContext } from "../../loadingContext";
export const STEP1 = "step-one";

const Step1: React.FunctionComponent = () => {
  const { resolve, getData } = React.useContext(StepperContext);
  const { setLoading } = React.useContext(LoadingContext);

  const data = getData(STEP1);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(STEP1, true);
    setTimeout(() => {
      resolve("step1 resolved data");
      setLoading(STEP1, false);
    }, 1000);
  };

  return (
    <StepperContent
      onSubmit={onSubmit}
      actions={
        <React.Fragment>
          <StepperAction disabled={true}>Back</StepperAction>
          <StepperAction align="right" type="reset" disabled={true}>
            Reset
          </StepperAction>
          <StepperAction align="right" type="submit">
            Continue
          </StepperAction>
        </React.Fragment>
      }
    >
      Step1 resolved:
      <pre>
        {data}
      </pre>
    </StepperContent>
  );
};

export default Step1;
