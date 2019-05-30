import * as React from "react";
import Stepper, { Step, StepperContext } from "./stepper";

const Step1 = () => {
  const { resolve } = React.useContext(StepperContext);

  return (
    <>
      Step 1 content
      <button onClick={resolve}>continue</button>
    </>
  )
}

const StepperExample: React.FunctionComponent = () => (
  <Stepper>
    <Step title="Step 1">
      <Step1 />
    </Step>
    <Step title="Step 2">
      Step 2 content
    </Step>
    <Step title="Step 3">
      Step 3 content
    </Step>
  </Stepper>
);

export default StepperExample;
