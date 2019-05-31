import * as React from "react";
import StepperProvider from "./context";
import Header from "./header";
import StepperContent from "./content";

const Stepper: React.FunctionComponent = ({ children }) => (
  <StepperProvider>
    {({ getSteps, getCurrentStep }) => {
      var step = getCurrentStep();
      console.log(step);

      return (
        <div className="stepper">
          <header className="stepper__head">
            {getSteps().map(step => (
              <Header key={step.index} title={step.config.title} index={step.index} />
            ))}
          </header>
          {step && (
            <StepperContent error={step.error}>
              {step.config.children}
            </StepperContent>
          )}
          {children}
        </div>
      );
    }}
  </StepperProvider>
);

export default Stepper;
