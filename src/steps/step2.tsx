import * as React from "react";
import { StepperContext, StepperContent, StepperAction } from "../stepper";

const Step2 = () => {
  const nameRef = React.useRef<HTMLInputElement>();
  const emailRef = React.useRef<HTMLInputElement>();
  const { reject, resolve, getData, goAt } = React.useContext(StepperContext);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTimeout(() => {
      const name = nameRef.current && nameRef.current.value;
      const email = emailRef.current && emailRef.current.value;

      if (name.length < 3) {
        reject(new Error("invalid name"));
      } else {
        resolve({
          name,
          email
        });
      }
    }, 100);
  };

  const data = getData(2) || {};

  return (
    <StepperContent
      onSubmit={onSubmit}
      actions={(
        <React.Fragment>
          <StepperAction onClick={() => goAt(1)}>Back</StepperAction>
          <StepperAction align="right" type="reset">Reset</StepperAction>
          <StepperAction align="right" type="submit">Continue</StepperAction>
        </React.Fragment>
      )}
    >
      <fieldset>
        <label>
          Name
          <input
            name="name"
            ref={nameRef}
            defaultValue={data.name}
            required
            type="text"
          />
        </label>
        <label>
          Input 2
          <input
            name="email"
            ref={emailRef}
            defaultValue={data.email}
            required
            type="email"
          />
        </label>
      </fieldset>
    </StepperContent>
  );
};

export default Step2;
