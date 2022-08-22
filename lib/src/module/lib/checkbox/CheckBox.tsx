import React from "react";
import { cx } from "lib/module/lib/functions";
import * as Icons from "lib/module/lib/Icons";
import { useControl } from "lib/module/lib/hook";
import { N_CheckBox } from "lib/@types";

const cn = "jk__checkbox";

function CheckBox(props: N_CheckBox.Props) {
  const { id, disabled, className } = props;

  const [checked, onChange] = useControl({ state: props.checked, dispatcher: props.onChange }, 0);

  const checkHandler = (): void => {
    if (disabled) return;
    onChange(checked === 1 ? 0 : 1);
  };

  return (
    <div
      id={id}
      role="button"
      tabIndex={0}
      style={props.st}
      className={cx(cn, {
        [className]: className,
        checked: checked === 1,
        indeter: checked === 2,
        disabled,
      })}
      onKeyPress={checkHandler}
      onClick={checkHandler}>
      <div className={cn.concat("__container")}>
        {checked === 1 && <Icons.Check className={cx(cn.concat("__check__icon"))} />}
        {checked === 2 && <Icons.Dash className={cx(cn.concat("__indeterminate__icon"))} />}
      </div>
      {props.label && <div className={cx(cn.concat("__label"))}>{props.label}</div>}
    </div>
  );
}

const defaultProps: N_CheckBox.DefaultProps = { className: "", disabled: false };
CheckBox.defaultProps = defaultProps;

export default CheckBox;
