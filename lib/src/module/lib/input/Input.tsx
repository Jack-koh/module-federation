import React, { useContext, useEffect, useState } from "react";
import { cx } from "lib/module/lib/functions";
import { useControl } from "lib/module/lib/hook";
import { pick } from "lodash";
import * as Icons from "lib/module/lib/Icons";
import { N_Input } from "lib/@types";
import getHandlers from "./handler";
import { Validator, validator } from "../index";

const cn = "jk__input";

function Input(props: N_Input.Props) {
  const [error, setError] = useState<string | string[]>(props.error);
  const [type, setType] = useState(props.type);
  const [value, onChange] = useControl({ state: props.value, dispatcher: props.onChange }, "");
  const { excute } = useContext(Validator.Context);

  const disabled = !!(props.disabled || props.readonly);
  const { className, validType, rules } = props;
  const valid = { realtime: validType === "realtime", blur: validType === "blur" };

  // Error 리셋
  useEffect(() => {
    setError(props.error);
  }, [props.error]);

  // 비활성화시 valid error 리셋
  useEffect(() => {
    if (disabled) setError("");
  }, [disabled]);

  // EXCUTE EFFECT #############################################
  useEffect(() => {
    const excutable = excute && rules && !disabled;
    if (excutable) {
      const { errorMessage } = validator.excute(rules, value);
      setError(errorMessage);
    }
  }, [excute]);

  const handler = getHandlers({
    valid,
    props,
    onChange,
    value,
    state: { error, type },
    setState: { type: setType, error: setError },
  });

  return (
    <div
      id={props.id}
      className={cx(cn, { [className]: className, error: error.length, value: !!value, disabled })}>
      <input
        style={props.st}
        ref={props.innerRef}
        value={value}
        type={type}
        spellCheck="false"
        onChange={handler.onChange}
        onBlur={handler.onBlur}
        onKeyDown={handler.onKeyEnter}
        readOnly={props.readonly}
        {...pick(props, ["placeholder", "disabled", "min", "max", "onFocus"])}
      />

      {props.type === "password" && (
        <button
          type="button"
          className={cx(cn.concat("__lock__icon"))}
          onClick={() => {
            if (!disabled) setType(type === "text" ? "password" : "text");
          }}>
          {type === "text" ? <Icons.LockOpend /> : <Icons.LockClosed />}
        </button>
      )}
      <Validator.Error error={error} top={props.st?.height ?? 40} />
    </div>
  );
}

const defautProps: N_Input.DefaultProps = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  keyEnter(_value: string) { /* prettier-ignore */ },
  onBlur() {  /* prettier-ignore */ },
  type: "text",
  className: "",
  disabled: false,
  error: "",
};

Input.defaultProps = defautProps;

export default Input;
