import * as React from "react";
import StepperProvider from "./context";
import Header from "./header";
import StepperContent from "./content";

const Stepper: React.FunctionComponent = ({ children }) => (
  <StepperProvider>
    {({ getSteps, getCurrentStep }) => {
      var step = getCurrentStep();

      return (
        <div className="stepper">
          {getSteps().map(step => (
            <Header title={step.config.title} index={step.index} />
          ))}
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
