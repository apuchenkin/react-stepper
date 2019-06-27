import * as React from "react";
import Stepper, { Step, StepperContext, StepperController } from "react-material-stepper";
import LoadingProvider, { LoadingContext } from "../loadingContext";
import { Step1, STEP1, Step2, STEP2, Step3, STEP3 } from "./steps";
import './style.scss';

const StepperExample: React.FunctionComponent = () => {
  const { isLoading, setLoading } = React.useContext(LoadingContext);
  const stepperControllerRef = React.useRef<StepperController>();

  const onComplete = (stepId: string) => {
    setLoading(STEP3, true);
    setTimeout(() => {
      setLoading(STEP3, false);
      alert(`completed ${stepId}`);
    }, 1000);
  };

  const onResolve = (stepId: any) => {
    const controller = stepperControllerRef.current;
    const steps = controller.getSteps();

    if (steps.length && steps.every(step => step.completed)) {
      onComplete(stepId);
    }
  };

  const initial = {
    step2: true,
    step3: true
  };

  return (
    <Stepper contextRef={stepperControllerRef} initialStep={STEP2} onResolve={onResolve}>
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
            <Step stepId={STEP2} title="Step Two" loading={isLoading(STEP2)} description="Login is required">
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
