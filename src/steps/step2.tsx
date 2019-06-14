import * as React from "react";
import { LoadingContext } from "../loadingContext";
import { StepperAction, StepperContent, StepperContext } from "../stepper";
import { STEP1 } from "./step1";

export const STEP2 = "step-two";

const Step2 = () => {
  const nameRef = React.useRef<HTMLInputElement>();
  const emailRef = React.useRef<HTMLInputElement>();
  const { reject, resolve, getData, goAt } = React.useContext(StepperContext);
  const { isLoading, setLoading } = React.useContext(LoadingContext);

  const back = () => goAt(STEP1);
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(STEP2, true);

    setTimeout(() => {
      setLoading(STEP2, false);
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

  const data = getData(STEP2) || {};

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
      loading: {String(isLoading(STEP2))}
      <fieldset disabled={isLoading(STEP2)}>
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
          Email
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
