import * as React from "react";
import {
  StepperAction,
  StepperContent,
  StepperContext
} from "react-material-stepper";
export const STEP1 = "step-one";

interface Props {
  vertical?: boolean;
}

const Step1: React.FunctionComponent<Props> = ({ vertical = false }) => {
  const { resolve, getData } = React.useContext(StepperContext);

  const data = getData(STEP1);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    resolve("step1 resolved data");
  };

  return (
    <StepperContent
      onSubmit={onSubmit}
      actions={
        <React.Fragment>
          {!vertical && <StepperAction disabled={true}>Back</StepperAction>}
          {!vertical && (
            <StepperAction align="right" type="reset" disabled={true}>
              Reset
            </StepperAction>
          )}
          <StepperAction align={vertical ? "left" : "right"} type="submit">
            Continue
          </StepperAction>
        </React.Fragment>
      }
    >
      Step1 resolved:
      <pre>{data}</pre>
    </StepperContent>
  );
};

export default Step1;
