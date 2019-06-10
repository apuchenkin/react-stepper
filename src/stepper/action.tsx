import * as React from "react";
import classnames from "classnames";
import "./action.scss";

const ALIGN_LEFT = 'left';
const ALIGN_RIGHT = 'right';

type Align = "left" | "right";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  raised?: boolean;
  align?: Align;
}

const StepperAction: React.FunctionComponent<Props> = ({
  raised = false,
  align = ALIGN_LEFT,
  className,
  children,
  ...props
}) => (
  <button
    {...props}
    className={classnames("mdc-button", "stepper__action", className, {
      "mdc-button--raised": raised,
      "mdc-button-align--left": align === ALIGN_LEFT,
      "mdc-button-align--right": align === ALIGN_RIGHT,
    })}
  >
    <span className="mdc-button__label">{children}</span>
  </button>
);

export default StepperAction;
