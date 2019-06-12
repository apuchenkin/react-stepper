import * as React from "react";
import Stepper, { Step, StepperContext } from "./stepper";
import { Step1, Step2, Step3 } from "./steps";
import LoadingProvider, { LoadingContext } from "./loadingContext";

const StepperExample: React.FunctionComponent = () => (
  <LoadingProvider>
    <LoadingContext.Consumer>
      {({ isLoading, setLoading }) => (
        <Stepper
          initialStep={2}
          onComplete={context => {
            setLoading(3, true);
            setTimeout(() => {
              setLoading(3, false);
              alert(`completed ${context.getData(3)}`);
            }, 1000);
          }}
        >
          <Step data="initialData" title="Step 1" description="This step is optional" loading={isLoading(1)}>
            <Step1 />
          </Step>
          <Step title="Step 2" loading={isLoading(2)}>
            <Step2 />
          </Step>
          <StepperContext.Consumer>
            {stepperContext =>
              stepperContext.getData(1) && (
                <Step title="Step 3" loading={isLoading(3)}>
                  <Step3 />
                </Step>
              )
            }
          </StepperContext.Consumer>
        </Stepper>
      )}
    </LoadingContext.Consumer>
  </LoadingProvider>
);

export default StepperExample;
