import * as React from "react";
import { Context, StepIndex } from "./context";
import classnames from "classnames";
import Svg from "./svg";
import * as doneIcon from "../../icons/baseline-done-24px.svg";
import * as warningIcon from "../../icons/baseline-warning-24px.svg";

interface Props {
  index: StepIndex;
  title: React.ReactNode;
}

const CLASS_NAME = "stepper__head";

const Header: React.FunctionComponent<Props> = ({ index, title }) => {
  const { isLoading, goAt, getStep, getCurrentStep } = React.useContext(Context);
  const current = getCurrentStep();
  const { loading, completed, error, disabled, description, className } = getStep(index);

  const active = Boolean(current && current.index === index);
  const disabled$ = disabled
    || isLoading()
    || !Boolean(active || completed || error)

  return (
    <button
      tabIndex={0}
      disabled={disabled$}
      className={classnames(className, CLASS_NAME, {
        [`${CLASS_NAME}--loading`]: loading,
        [`${CLASS_NAME}--completed`]: completed,
        [`${CLASS_NAME}--error`]: error,
        [`${CLASS_NAME}--active`]: active,
        [`${CLASS_NAME}--disabled`]: disabled$,
      })}
      onClick={() => goAt(index)}
    >
      <span className={`${CLASS_NAME}__index`}>
        {error && (
          <Svg className={`${CLASS_NAME}__icon`} content={warningIcon} />
        )}
        {!error && completed && (
          <Svg className={`${CLASS_NAME}__icon`} content={doneIcon} />
        )}
        {!error && !completed && index}
      </span>
      <span className={`${CLASS_NAME}__title`}>
        {title}
        {description && (
          <span className={`${CLASS_NAME}__description`}>
            {description}
          </span>
        )}
      </span>
    </button>
  );
};

export default React.memo(Header);
