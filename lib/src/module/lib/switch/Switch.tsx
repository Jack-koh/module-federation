import React, { useState } from "react";
import classNames from "classnames";

interface Props {
  value?: number | boolean;
  onChange?: (value: number) => void;
  className?: string;
  disabled?: boolean;
}

const Switch: React.FC<Props> = ({ onChange = () => false, value, disabled = false, ...rest }) => {
  const [toggle, setToggle] = useState(value ?? 0);
  const check = value ?? toggle;

  const onChangeHandler = () => {
    if (disabled) return;
    const changeHandler = onChange ?? setToggle;
    changeHandler(check ? 0 : 1);
    if (!value) setToggle(check ? 0 : 1);
  };

  const className = classNames("jk__switch__container", {
    [rest.className as string]: rest.className,
    on: check,
    disabled,
  });

  return (
    <div className={className} onClick={onChangeHandler}>
      <div className="switch__text">{value ? "ON" : "OFF"}</div>
      <div className="switch__button" />
    </div>
  );
};

export default Switch;
