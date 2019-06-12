import * as React from "react";
import { StepperContext, StepperContent, StepperAction } from "../stepper";
import { LoadingContext } from "../loadingContext";

const STEP_INDEX = 3;

const Step3 = () => {
  const { resolve, getData, goAt } = React.useContext(StepperContext);
  const { setLoading } = React.useContext(LoadingContext);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(STEP_INDEX, true);

    setTimeout(() => {
      setLoading(STEP_INDEX, false);
      resolve(true);
    }, 100);
  };

  const data1 = getData(1);
  const data2 = getData(2) || {};

  return (
    <StepperContent
      onSubmit={onSubmit}
      actions={
        <React.Fragment>
          <StepperAction onClick={() => goAt(STEP_INDEX - 1)}>
            Back
          </StepperAction>
          <StepperAction align="right" type="reset" disabled>
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
          {data1}
        </label>
        <label>
          Step 2 data: Name: {data2.name}, Email: {data2.email}
        </label>
      </fieldset>
    </StepperContent>
  );
};

export default Step3;
