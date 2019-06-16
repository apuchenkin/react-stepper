import * as React from "react";
import { StepperAction, StepperContent, StepperContext } from "react-material-stepper";
import { LoadingContext } from "../loadingContext";
import { STEP1 } from "./step1";
import { STEP2 } from "./step2";

export const STEP3 = "step-three";

const Step3 = () => {
  const { resolve, getData, goAt } = React.useContext(StepperContext);
  const { setLoading } = React.useContext(LoadingContext);

  const back = () => goAt(STEP2);
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(STEP3, true);

    setTimeout(() => {
      setLoading(STEP3, false);
      resolve(true);
    }, 100);
  };

  const data1 = getData(STEP1);
  const data2 = getData(STEP2) || {};

  return (
    <StepperContent
      onSubmit={onSubmit}
      actions={
        <React.Fragment>
          <StepperAction onClick={back}>Back</StepperAction>
          <StepperAction align="right" type="reset" disabled={true}>
            Reset
          </StepperAction>
          <StepperAction align="right" type="submit">
            Complete
          </StepperAction>
        </React.Fragment>
      }
    >
      <fieldset>
        <label>
          Step 1 data:
          <pre>{JSON.stringify(data1)}</pre>
        </label>
        <label>
          Step 2 data: Name: {data2.name}, Email: {data2.email}
        </label>
      </fieldset>
    </StepperContent>
  );
};

export default Step3;
