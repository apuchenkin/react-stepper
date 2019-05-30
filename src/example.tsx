import * as React from "react";
import Stepper, { Step } from "./stepper";

const StepperExample: React.FunctionComponent = () => (
  <Stepper>
    <Step title="Step 1">
      Step 1
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
