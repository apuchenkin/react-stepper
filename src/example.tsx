import * as React from "react";
import Stepper, { Step, StepperContext } from "./stepper";

const Step1 = () => {
  const { resolve, getData } = React.useContext(StepperContext);
  const data = getData(1);
  const onClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setTimeout(() => {
      resolve('step 1 static data resolved');
    }, 100)
  }

  return (
    <>
      Step 1 content:
      <pre>{data}</pre>
      <button onClick={onClick}>continue</button>
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
