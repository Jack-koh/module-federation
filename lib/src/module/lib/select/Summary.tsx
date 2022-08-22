import React, { useContext } from "react";
import { SelectContext } from "./Select";
import { N_Select } from "lib/@types";
import { cn } from "./Select";
import { ArrowDown } from "lib/module/lib/Icons";
import { cx } from "lib/module/lib/functions";

function Summary(props: N_Select.Summary.Props) {
  const { toggle, selected, setToggle, disabled } = useContext(SelectContext);
  const toggleHandler = (): boolean | void => !disabled && setToggle(!toggle);

  const label = [...selected.values()].map((el) => el.label).join(", ");

  return (
    <div
      role="button"
      tabIndex={0}
      className={cx(cn.concat("__button"))}
      title={label}
      onKeyPress={toggleHandler}
      onClick={toggleHandler}>
      <div className="button__title">{selected.size ? label : props.placeholder}</div>
      <ArrowDown className={cx(cn.concat("__icon"))} />
    </div>
  );
}

Summary.displayName = "JK_SELECT_SUMMARY";
const defaultProps: N_Select.Summary.DefaultProps = { placeholder: "선택값을 입력하세요" };
Summary.defaultProps = defaultProps;

export default Summary;
