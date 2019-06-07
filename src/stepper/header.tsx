import * as React from "react";
import { Context, StepIndex } from "./context";
import classnames from "classnames";
import doneIcon from "../icons/baseline-done-24px.svg";

interface Props {
  index: StepIndex;
  title: React.ReactNode;
}

const CLASS_NAME = "stepper__head";

const Header: React.FunctionComponent<Props> = ({ index, title }) => {
  const { goAt, getStep, getCurrentStep } = React.useContext(Context);
  const current = getCurrentStep();
  const { loading, completed, error, disabled } = getStep(index);
  const active = Boolean(current && current.index === index);
  const enabled = Boolean(active || completed || error);

  return (
    <button
      tabIndex={0}
      disabled={disabled || !enabled}
      className={classnames(CLASS_NAME, {
        [`${CLASS_NAME}--loading`]: loading,
        [`${CLASS_NAME}--completed`]: completed,
        [`${CLASS_NAME}--error`]: error,
        [`${CLASS_NAME}--active`]: active,
        [`${CLASS_NAME}--disabled`]: disabled || !enabled,
        [`${CLASS_NAME}--enabled`]: enabled
      })}
      onClick={!disabled && enabled ? () => goAt(index) : undefined}
    >
      <span className={`${CLASS_NAME}__index`}>{
        completed
          ? <img src={doneIcon} />
          : index
      }</span>
      {title}
    </button>
  );
};

export default Header;
