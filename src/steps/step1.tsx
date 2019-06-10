import * as React from "react";
import { StepperContext, StepperContent, StepperAction } from "../stepper";
import { LoadingContext } from "../loadingContext";

const STEP_INDEX = 1;

const Step1 = () => {
  const { resolve, getData } = React.useContext(StepperContext);
  const { setLoading } = React.useContext(LoadingContext);

  const data = getData(STEP_INDEX);

  const onClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setLoading(STEP_INDEX, true);
    setTimeout(() => {
      resolve("step 1 static data resolved");
      setLoading(STEP_INDEX, false);
    }, 1000);
  };

  return (
    <StepperContent
      actions={
        <React.Fragment>
          <StepperAction disabled onClick={onClick}>Back</StepperAction>
          <StepperAction align="right" onClick={onClick}>Reset</StepperAction>
          <StepperAction align="right" onClick={onClick}>Continue</StepperAction>
        </React.Fragment>
      }
    >
      Step 1 content:
      <pre>{data}</pre>
    </StepperContent>
  );
};

export default Step1;
