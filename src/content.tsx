import classnames from "classnames";
import * as React from "react";

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  actions?: React.ReactNode;
}

const StepperContent: React.FunctionComponent<Props> = ({
  className,
  children,
  actions,
  ...props
}) => (
  <form {...props} className={classnames("stepper__content", className)}>
    {children}
    {actions && (
      <footer className="stepper__content__actions">{actions}</footer>
    )}
  </form>
);

export default StepperContent;
