import { MDCTextField } from "@material/textfield";
import * as React from "react";
import { StepperAction, StepperContent, StepperContext } from "react-material-stepper";
import { LoadingContext } from "../../loadingContext";
import { STEP1 } from "./step1";

export const STEP2 = "step-two";

const Step2 = () => {
  const loginField = React.useRef<HTMLDivElement>();
  const emailField = React.useRef<HTMLDivElement>();
  const loginRef = React.useRef<HTMLInputElement>();
  const emailRef = React.useRef<HTMLInputElement>();
  const { reject, resolve, getData, goAt } = React.useContext(StepperContext);
  const { isLoading, setLoading } = React.useContext(LoadingContext);

  const back = () => goAt(STEP1);
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(STEP2, true);

    setTimeout(() => {
      setLoading(STEP2, false);
      const login = loginRef.current && loginRef.current.value;
      const email = emailRef.current && emailRef.current.value;

      if (login.length < 3) {
        reject("Invalid login", "Please use at least 3 characters");
      } else {
        resolve({
          email,
          login
        });
      }
    }, 3000);
  };

  const data = getData(STEP2) || {};
  React.useEffect(() => {
    const login$ = new MDCTextField(loginField.current);
    const email$ = new MDCTextField(emailField.current);
  }, []);

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
      <p className="mdc-typography--subtitle2">
        loading: {String(isLoading(STEP2))}
      </p>
      <div ref={loginField} className="mdc-text-field">
        <input
          name="login"
          className="mdc-text-field__input"
          ref={loginRef}
          defaultValue={data.login}
          required={true}
          type="text"
        />
        <div className="mdc-line-ripple" />
        <label className="mdc-floating-label">Login</label>
      </div>
      <div ref={emailField} className="mdc-text-field">
        <input
          name="email"
          className="mdc-text-field__input"
          ref={emailRef}
          defaultValue={data.email}
          required={true}
          type="email"
        />
        <div className="mdc-line-ripple" />
        <label className="mdc-floating-label">Email</label>
      </div>
    </StepperContent>
  );
};

export default Step2;
