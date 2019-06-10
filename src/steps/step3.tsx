import * as React from "react";
import { StepperContext, StepperContent, StepperAction } from "../stepper";

const Step3 = () => {
  const { resolve, getData } = React.useContext(StepperContext);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTimeout(() => {
      resolve(true);
    }, 100);
  };

  const data1 = getData(1);
  const data2 = getData(2) || {};

  return (
    <StepperContent
      onSubmit={onSubmit}
      actions={(
        <React.Fragment>
          <StepperAction disabled>Back</StepperAction>
          <StepperAction align="right" type="reset">Reset</StepperAction>
          <StepperAction align="right" type="submit">Continue</StepperAction>
        </React.Fragment>
      )}
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
