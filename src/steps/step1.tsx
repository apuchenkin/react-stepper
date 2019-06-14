import * as React from "react";
import { LoadingContext } from "../loadingContext";
import { StepperAction, StepperContent, StepperContext } from "../stepper";

const STEP_INDEX = 1;

const Step1: React.FunctionComponent = () => {
  const { resolve, getData, updateStep } = React.useContext(StepperContext);
  const { setLoading } = React.useContext(LoadingContext);

  const data = getData(STEP_INDEX);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(STEP_INDEX, true);
    setTimeout(() => {
      resolve(data);
      setLoading(STEP_INDEX, false);
    }, 1000);
  };

  const toggle = (step: string) => () => {
    updateStep(STEP_INDEX, {
      data: {
        ...data,
        [step]: !data[step]
      }
    });
  };

  return (
    <StepperContent
      onSubmit={onSubmit}
      actions={
        <React.Fragment>
          <StepperAction disabled={true}>Back</StepperAction>
          <StepperAction align="right" type="reset" disabled={true}>
            Reset
          </StepperAction>
          <StepperAction align="right" type="submit">
            Continue
          </StepperAction>
        </React.Fragment>
      }
    >
      <label>
        <input
          type="checkbox"
          name="step2"
          checked={data.step2}
          onChange={toggle("step2")}
        />
        Step 2
      </label>
      <label>
        <input
          type="checkbox"
          name="step3"
          checked={data.step3}
          onChange={toggle("step3")}
        />
        Step 3
      </label>
    </StepperContent>
  );
};

export default Step1;
