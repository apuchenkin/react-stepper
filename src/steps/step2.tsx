import * as React from "react";
import { LoadingContext } from "../loadingContext";
import { StepperAction, StepperContent, StepperContext } from "../stepper";

const STEP_INDEX = 2;

const Step2 = () => {
  const nameRef = React.useRef<HTMLInputElement>();
  const emailRef = React.useRef<HTMLInputElement>();
  const { reject, resolve, getData, goAt } = React.useContext(StepperContext);
  const { isLoading, setLoading } = React.useContext(LoadingContext);

  const back = () => goAt(STEP_INDEX - 1);
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(STEP_INDEX, true);

    setTimeout(() => {
      setLoading(STEP_INDEX, false);
      const name = nameRef.current && nameRef.current.value;
      const email = emailRef.current && emailRef.current.value;

      if (name.length < 3) {
        reject(new Error("invalid name"));
      } else {
        resolve({
          email,
          name
        });
      }
    }, 3000);
  };

  const data = getData(STEP_INDEX) || {};

  return (
    <StepperContent
      onSubmit={onSubmit}
      actions={
        <React.Fragment>
          <StepperAction type="button" onClick={back}>
            Back
          </StepperAction>
          <StepperAction align="right" type="reset">
            Reset
          </StepperAction>
          <StepperAction align="right" type="submit">
            Continue
          </StepperAction>
        </React.Fragment>
      }
    >
      loading: {String(isLoading(STEP_INDEX))}
      <fieldset disabled={isLoading(STEP_INDEX)}>
        <legend>User:</legend>
        <label>
          Name
          <input
            name="name"
            ref={nameRef}
            defaultValue={data.name}
            required={true}
            type="text"
          />
        </label>
        <label>
          Input 2
          <input
            name="email"
            ref={emailRef}
            defaultValue={data.email}
            required={true}
            type="email"
          />
        </label>
      </fieldset>
    </StepperContent>
  );
};

export default Step2;
