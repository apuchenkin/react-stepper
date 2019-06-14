import * as React from "react";
import LoadingProvider, { LoadingContext } from "./loadingContext";
import Stepper, { Step, StepperContext, StepperController } from "./stepper";
import { Step1, Step2, Step3 } from "./steps";

const StepperExample: React.FunctionComponent = () => {
  const { isLoading, setLoading } = React.useContext(LoadingContext);

  const onComplete = (context: StepperController) => {
    setLoading(3, true);
    setTimeout(() => {
      setLoading(3, false);
      alert(`completed ${context.getData(3)}`);
    }, 1000);
  };

  const initial = {
    step2: true,
    step3: true
  };

  return (
    <Stepper initialStep={2} onComplete={onComplete}>
      <Step
        index={1}
        data={initial}
        title="Step 1"
        description="This step is optional"
        loading={isLoading(1)}
      >
        <Step1 />
      </Step>
      <StepperContext.Consumer>
        {stepperContext =>
          stepperContext.getData(1, initial).step2 && (
            <Step index={2} title="Step 2" loading={isLoading(2)}>
              <Step2 />
            </Step>
          )
        }
      </StepperContext.Consumer>
      <StepperContext.Consumer>
        {stepperContext =>
          stepperContext.getData(1, initial).step3 && (
            <Step index={3} title="Step 3" loading={isLoading(3)}>
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
