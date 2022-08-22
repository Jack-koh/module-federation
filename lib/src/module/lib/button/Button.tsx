import React from "react";
import { cx } from "lib/module/lib/functions";
import { Proccessing } from "lib/module/lib/loading/Loading";
import { N_Button } from "lib/@types";

const cn = "jk__button";

function Button(props: N_Button.Props) {
  const { id, type, disabled, onClick, className } = props;
  const onClickHandler = (e: React.UIEvent) => {
    if (!props.loading) onClick(e);
  };
  return (
    <button
      id={id}
      type={type}
      disabled={disabled}
      style={props.st}
      onClick={onClickHandler}
      className={cx(cn, { [className]: !!className, disabled })}>
      {props.loading ? <Proccessing /> : props.children}
    </button>
  );
}

const defaultProps: N_Button.DefaultProps = {
  type: "button",
  className: "",
  loading: false,
  disabled: false,
  children: "Button",
  onClick() { /* prettier-ignore */ },
};
Button.defaultProps = defaultProps;

export default Button;
