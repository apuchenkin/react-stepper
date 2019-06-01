import * as React from "react";
import { StepperContext } from "../stepper";

const Step1 = () => {
  const { resolve, getData } = React.useContext(StepperContext);
  const data = getData(1);
  const onClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setTimeout(() => {
      resolve("step 1 static data resolved");
    }, 100);
  };

  return (
    <>
      Step 1 content:
      <pre>{data}</pre>
      <button onClick={onClick}>continue</button>
    </>
  );
};

export default Step1;
