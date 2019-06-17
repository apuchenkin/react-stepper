import * as React from "react";
import {
  StepperAction,
  StepperContent,
  StepperContext
} from "react-material-stepper";
import { LoadingContext } from "../../loadingContext";
export const STEP1 = "step-one";

const Step1: React.FunctionComponent = () => {
  const { resolve, getData, updateStep } = React.useContext(StepperContext);
  const { setLoading } = React.useContext(LoadingContext);

  const data = getData(STEP1);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(STEP1, true);
    setTimeout(() => {
      resolve(data);
      setLoading(STEP1, false);
    }, 1000);
  };

  const toggle = (step: string) => () => {
    updateStep(STEP1, {
      data: {
        ...data,
        [step]: !data[step]
      }
    });
  };

  return (
    <StepperContent
      onSubmit={onSubmit}
      actions={
        <React.Fragment>
          <StepperAction disabled={true}>Back</StepperAction>
          <StepperAction align="right" type="reset" disabled={true}>
            Reset
          </StepperAction>
          <StepperAction align="right" type="submit">
            Continue
          </StepperAction>
        </React.Fragment>
      }
    >
      <div className="mdc-form-field">
        <div className="mdc-checkbox">
          <input
            type="checkbox"
            name="step2"
            className="mdc-checkbox__native-control"
            checked={data.step2}
            onChange={toggle("step2")}
            id="step2"
          />
          <div className="mdc-checkbox__background">
            <svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
              <path
                className="mdc-checkbox__checkmark-path"
                fill="none"
                d="M1.73,12.91 8.1,19.28 22.79,4.59"
              />
            </svg>
            <div className="mdc-checkbox__mixedmark" />
          </div>
        </div>
        <label htmlFor="step2">Step 2</label>
      </div>
      <div className="mdc-form-field">
        <div className="mdc-checkbox">
          <input
            type="checkbox"
            name="step3"
            className="mdc-checkbox__native-control"
            checked={data.step3}
            onChange={toggle("step3")}
            id="step3"
          />
          <div className="mdc-checkbox__background">
            <svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
              <path
                className="mdc-checkbox__checkmark-path"
                fill="none"
                d="M1.73,12.91 8.1,19.28 22.79,4.59"
              />
            </svg>
            <div className="mdc-checkbox__mixedmark" />
          </div>
        </div>
        <label htmlFor="step3">Step 3</label>
      </div>
    </StepperContent>
  );
};

export default Step1;
