import * as React from "react";
import StepperProvider, { StepperContext } from "./context";
import classnames from "classnames";
import Header from "./header";
import "./stepper.scss";

interface Props {
  onComplete?: (context: StepperContext) => void;
  className?: string;
}

const Stepper: React.FunctionComponent<Props> = ({
  onComplete,
  className,
  children
}) => (
  <StepperProvider onComplete={onComplete}>
    {({ getSteps, getCurrentStep }) => {
      var step = getCurrentStep();

      return (
        <div className={classnames("stepper", className)}>
          <header className="stepper__header">
            {getSteps().map(step => (
              <Header
                key={step.index}
                title={step.config.title}
                index={step.index}
              />
            ))}
          </header>
          {step && step.config.children}
          {children}
        </div>
      );
    }}
  </StepperProvider>
);

export default Stepper;
