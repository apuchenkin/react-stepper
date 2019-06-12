import * as React from "react";
import { StepperContext, StepperContent, StepperAction } from "../stepper";
import { LoadingContext } from "../loadingContext";

const STEP_INDEX = 1;

const Step1 = () => {
  const { resolve, getData } = React.useContext(StepperContext);
  const { setLoading } = React.useContext(LoadingContext);

  const data = getData(STEP_INDEX);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(STEP_INDEX, true);
    setTimeout(() => {
      resolve("step 1 static data resolved");
      setLoading(STEP_INDEX, false);
    }, 1000);
  };

  return (
    <StepperContent
      onSubmit={onSubmit}
      actions={
        <React.Fragment>
          <StepperAction disabled>Back</StepperAction>
          <StepperAction align="right" type="reset" disabled>
            Reset
          </StepperAction>
          <StepperAction align="right" type="submit">
            Continue
          </StepperAction>
        </React.Fragment>
      }
    >
      Step 1 content:
      <pre>{data}</pre>
    </StepperContent>
  );
};

export default Step1;
