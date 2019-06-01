import * as React from "react";
import { StepperContext } from "../stepper";

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
    <form onSubmit={onSubmit}>
      <fieldset>
        <label>
          Step 1 data:
          {data1}
        </label>
        <label>
          Step 2 data: Name: {data2.name}, Email: {data2.email}
        </label>
      </fieldset>
      <footer>
        <button type="submit">complete</button>
      </footer>
    </form>
  );
};

export default Step3;
