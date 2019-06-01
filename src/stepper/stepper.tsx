import * as React from "react";
import StepperProvider, { StepperContext } from "./context";
import Header from "./header";

interface Props {
  onComplete: (context: StepperContext) => void;
}

const Stepper: React.FunctionComponent<Props> = ({ onComplete, children }) => (
  <StepperProvider onComplete={onComplete}>
    {({ getSteps, getCurrentStep }) => {
      var step = getCurrentStep();

      return (
        <div className="stepper">
          <header className="stepper__head">
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
