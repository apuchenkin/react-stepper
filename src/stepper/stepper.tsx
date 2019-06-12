import * as React from "react";
import StepperProvider, { StepperContext } from "./context";
import classnames from "classnames";
import Header from "./header";
import StepperProgress from "./progress";
import "./stepper.scss";

interface Props {
  initialStep?: number;
  onComplete?: (context: StepperContext) => void;
  className?: string;
}

const Stepper: React.FunctionComponent<Props> = ({
  onComplete,
  initialStep,
  className,
  children
}) => (
  <StepperProvider initialStep={initialStep} onComplete={onComplete}>
    {({ getSteps, getCurrentStep }) => {
      const step = getCurrentStep();
      const steps = getSteps();
      const isLoading = steps.some(step => step.loading);

      return (
        <div className={classnames("stepper", className)}>
          <header className="stepper__header">
            {steps.map((step, idx) => (
              <React.Fragment key={step.index}>
                <Header title={step.title} index={step.index} />
                {idx + 1 < steps.length && (
                  <hr className="stepper__header__connector" />
                )}
              </React.Fragment>
            ))}
          </header>
          {isLoading && <StepperProgress className="stepper__progress" />}
          {step && step.children}
          {children}
        </div>
      );
    }}
  </StepperProvider>
);

export default Stepper;
