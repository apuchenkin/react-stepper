import * as React from "react";
import { StepError } from "./context";

interface Props {
  className?: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  error?: StepError;
}

const StepperContent: React.FunctionComponent<Props> = ({
  children,
  onSubmit,
  error,
}) => (
  <form onSubmit={onSubmit} className="stepper__content">
    {error && <div className="stepper-content__error">{String(error)}</div>}
    <section className="stepper-content__body">{children}</section>
  </form>
);

export default StepperContent;
