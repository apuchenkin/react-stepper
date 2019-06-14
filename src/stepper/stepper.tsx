import classnames from "classnames";
import * as React from "react";
import StepperProvider from "./context";
import Header from "./header";
import StepperProgress from "./progress";
import "./stepper.scss";
import { Handlers, StepId } from "./typings";

interface Props {
  initialStep?: StepId;
  onResolve?: Handlers.OnResolve;
  onReject?: Handlers.OnReject;
  className?: string;
}

const Stepper: React.FunctionComponent<Props> = ({
  onResolve,
  onReject,
  initialStep,
  className,
  children
}) => (
  <StepperProvider
    initialStep={initialStep}
    onResolve={onResolve}
    onReject={onReject}
  >
    {({ getSteps, getCurrentStep }) => {
      const currentStep = getCurrentStep();
      const steps = getSteps();
      const isLoading = steps.some(step => step.loading);

      return (
        <div className={classnames("stepper", className)}>
          <header className="stepper__header">
            {steps.map((step, idx) => (
              <React.Fragment key={step.stepId}>
                <Header stepId={step.stepId} index={idx + 1} />
                {idx + 1 < steps.length && (
                  <hr className="stepper__header__connector" />
                )}
              </React.Fragment>
            ))}
          </header>
          {isLoading && <StepperProgress className="stepper__progress" />}
          {currentStep && currentStep.children}
          {children}
        </div>
      );
    }}
  </StepperProvider>
);

export default Stepper;
