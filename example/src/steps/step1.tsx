import * as React from "react";
import { StepperAction, StepperContent, StepperContext } from "react-material-stepper";
import { LoadingContext } from "../loadingContext";
export const STEP1 = "step-one";

const Step1: React.FunctionComponent = () => {
  const { resolve, getData, updateStep } = React.useContext(StepperContext);
  const { setLoading } = React.useContext(LoadingContext);

  const data = getData(STEP1);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(STEP1, true);
    setTimeout(() => {
      resolve(data);
      setLoading(STEP1, false);
    }, 1000);
  };

  const toggle = (step: string) => () => {
    updateStep(STEP1, {
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
