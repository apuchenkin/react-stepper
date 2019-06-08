import * as React from "react";
import classnames from "classnames";
import "./action.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  raised?: boolean;
}

const StepperAction: React.FunctionComponent<Props> = ({
  raised = false,
  className,
  children,
  ...props
}) => (
  <button
    {...props}
    className={classnames("mdc-button", "stepper__action", className, {
      "mdc-button--raised": raised
    })}
  >
    <span className="mdc-button__label">{children}</span>
  </button>
);

export default StepperAction;
