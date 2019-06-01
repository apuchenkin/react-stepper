import * as React from "react";
import Stepper, { Step } from "./stepper";
import { Step1, Step2, Step3 } from "./steps";

const StepperExample: React.FunctionComponent = () => (
  <Stepper
    onComplete={context => {
      alert(`completed ${context.getData(3)}`);
    }}
  >
    <Step title="Step 1">
      <Step1 />
    </Step>
    <Step title="Step 2">
      <Step2 />
    </Step>
    <Step title="Step 3">
      <Step3 />
    </Step>
  </Stepper>
);

export default StepperExample;
