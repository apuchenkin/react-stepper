import classnames from "classnames";
import * as React from "react";
import StepperProvider, { OnReject, OnResolve, StepperController } from "./context";
import Header from "./header";
import StepperProgress from "./progress";
import { StepId } from "./typings";

interface Props {
  initialStep?: StepId;
  onResolve?: OnResolve;
  onReject?: OnReject;
  contextRef?: React.MutableRefObject<StepperController>;
  className?: string;
  vertical?: boolean;
}

const CLASSNAME = "stepper";

const Stepper: React.FunctionComponent<Props> = ({
  onResolve,
  onReject,
  initialStep,
  className,
  vertical = false,
  contextRef,
  children
}) => (
  <StepperProvider
    initialStep={initialStep}
    onResolve={onResolve}
    onReject={onReject}
    contextRef={contextRef}
  >
    {({ getSteps, getCurrentStep }) => {
      const currentStep = getCurrentStep();
      const steps = getSteps();
      const isLoading = steps.some(step => step.loading);
      const horizontal = !vertical;

      return (
        <div
          className={classnames(CLASSNAME, className, {
            [`${CLASSNAME}--horizontal`]: horizontal,
            [`${CLASSNAME}--vertical`]: vertical
          })}
        >
          {children}
          <header className={`${CLASSNAME}__header`}>
            {steps.map((step, idx) => (
              <React.Fragment key={step.stepId}>
                <Header stepId={step.stepId} index={idx + 1} />
                {idx + 1 < steps.length && (
                  <hr className={`${CLASSNAME}__connector`} />
                )}
              </React.Fragment>
            ))}
          </header>
          {isLoading && (
            <StepperProgress className={`${CLASSNAME}__progress`} />
          )}
          {steps.map((step, idx) => (
            <React.Fragment key={step.stepId}>
              {vertical && <Header stepId={step.stepId} index={idx + 1} />}
              <section className={`${CLASSNAME}__section`}>
                {vertical && idx + 1 < steps.length && (
                  <hr className={`${CLASSNAME}__connector`} />
                )}
                {step === currentStep && step.children}
              </section>
            </React.Fragment>
          ))}
        </div>
      );
    }}
  </StepperProvider>
);

export default Stepper;
