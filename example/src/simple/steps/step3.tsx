import * as React from "react";
import {
  StepperAction,
  StepperContent,
  StepperContext
} from "react-material-stepper";
import { STEP1 } from "./step1";
import { STEP2 } from "./step2";

export const STEP3 = "step-three";

interface Props {
  vertical?: boolean;
}

const Step3: React.FunctionComponent<Props> = ({ vertical = false }) => {
  const { resolve, getData, goAt } = React.useContext(StepperContext);

  const back = () => goAt(STEP2);
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resolve(true);
  };

  const data1 = getData(STEP1);
  const data2 = getData(STEP2) || {};

  return (
    <StepperContent
      onSubmit={onSubmit}
      actions={
        <React.Fragment>
          {!vertical && <StepperAction onClick={back}>Back</StepperAction>}
          {!vertical && (
            <StepperAction align="right" type="reset" disabled={true}>
              Reset
            </StepperAction>
          )}
          <StepperAction align={vertical ? "left" : "right"} type="submit">
            Complete
          </StepperAction>
        </React.Fragment>
      }
    >
      <fieldset>
        <label>Step 1 data: {data1}</label>
        <label>
          Step 2 data: Name: {data2.name}, Email: {data2.email}
        </label>
      </fieldset>
    </StepperContent>
  );
};

export default Step3;
