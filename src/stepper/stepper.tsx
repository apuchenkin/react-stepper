import * as React from "react";
import StepperProvider from "./context";
import Header from "./header";

const Stepper: React.FunctionComponent = ({ children }) => (
  <StepperProvider>
    {({ getSteps, getCurrentStep }) => (
      <div className="stepper">
        {getSteps().map((step, index) => (
          // TODO: capture index within state
          <Header {...step} index={index} />
        ))}
        <div className="content">{JSON.stringify(getCurrentStep())}</div>
        {children}
      </div>
    )}
  </StepperProvider>
);

export default Stepper;
