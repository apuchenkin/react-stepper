import * as React from "react";
import LoadingProvider, { LoadingContext } from "./loadingContext";
import Stepper, { Step, StepperContext, StepperController } from "./stepper";
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

    if (steps.length && steps.every(step => step.completed)) {
      onComplete(ctx.getData(STEP3));
    }
  };

  const initial = {
    step2: true,
    step3: true
  };

  return (
    <Stepper initialStep={STEP2} onResolve={onResolve}>
      <Step
        stepId={STEP1}
        data={initial}
        title="Step One"
        description="This step is optional"
        loading={isLoading(STEP1)}
      >
        <Step1 />
      </Step>
      <StepperContext.Consumer>
        {stepperContext =>
          stepperContext.getData(STEP1, initial).step2 && (
            <Step stepId={STEP2} title="Step Two" loading={isLoading(STEP2)} description="Name is required">
              <Step2 />
            </Step>
          )
        }
      </StepperContext.Consumer>
      <StepperContext.Consumer>
        {stepperContext =>
          stepperContext.getData(STEP1, initial).step3 && (
            <Step stepId={STEP3} title="Step Three" loading={isLoading(STEP3)}>
              <Step3 />
            </Step>
          )
        }
      </StepperContext.Consumer>
    </Stepper>
  );
};

export default () => (
  <LoadingProvider>
    <StepperExample />
  </LoadingProvider>
);
