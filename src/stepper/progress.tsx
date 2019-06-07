import * as React from "react";
import classnames from "classnames";

interface Props {
  className?: string;
}

const StepperProgress: React.FunctionComponent<Props> = ({ className }) => (
  <div
    role="progressbar"
    className={classnames(
      className,
      "mdc-linear-progress",
      "mdc-linear-progress--indeterminate"
    )}
  >
    <div className="mdc-linear-progress__buffering-dots"></div>
    <div className="mdc-linear-progress__buffer"></div>
    <div className="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
      <span className="mdc-linear-progress__bar-inner"></span>
    </div>
    <div className="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
      <span className="mdc-linear-progress__bar-inner"></span>
    </div>
  </div>
);

export default StepperProgress;
