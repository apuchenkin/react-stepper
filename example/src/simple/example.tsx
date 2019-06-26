import * as React from "react";
import Stepper, { Step } from "react-material-stepper";
import 'react-material-stepper/dist/react-stepper.css';
import { Step1, STEP1, Step2, STEP2, Step3, STEP3 } from "./steps";
import './style.css';

const StepperExample: React.FunctionComponent = () => (
  <Stepper>
    <Step
      stepId={STEP1}
      data="Step 1 initial state"
      title="Step One"
      description="This step is optional"
    >
      <Step1 />
    </Step>
    <Step stepId={STEP2} title="Step Two" description="Name is required">
      <Step2 />
    </Step>
    <Step stepId={STEP3} title="Step Three" >
      <Step3 />
    </Step>
  </Stepper>
);

export default StepperExample;
