import * as React from "react";
import Stepper, { Step, StepperController } from "react-material-stepper";
import 'react-material-stepper/dist/react-stepper.css';
import LoadingProvider, { LoadingContext } from "../loadingContext";
import { Step1, STEP1, Step2, STEP2, Step3, STEP3 } from "./steps";

const StepperExample: React.FunctionComponent = () => {
  const { isLoading, setLoading } = React.useContext(LoadingContext);

  const onComplete = (data: boolean) => {
    setLoading(STEP3, true);
    setTimeout(() => {
      setLoading(STEP3, false);
      alert(`completed ${data}`);
    }, 1000);
  };

  const onResolve = (ctx: StepperController) => {
    const steps = ctx.getSteps();

    if (steps.length && steps.every(step => step.completed)
    ) {
      onComplete(ctx.getData(STEP3));
    }
  };

  return (
    <Stepper initialStep={STEP1} onResolve={onResolve}>
      <Step
        stepId={STEP1}
        data="Step 1 initial state"
        title="Step One"
        description="This step is optional"
        loading={isLoading(STEP1)}
      >
        <Step1 />
      </Step>
      <Step stepId={STEP2} title="Step Two" loading={isLoading(STEP2)} description="Name is required">
        <Step2 />
      </Step>
      <Step stepId={STEP3} title="Step Three" loading={isLoading(STEP3)}>
        <Step3 />
      </Step>
    </Stepper>
  );
};

export default () => (
  <LoadingProvider>
    <StepperExample />
  </LoadingProvider>
);
