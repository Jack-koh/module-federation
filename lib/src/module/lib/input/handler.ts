import { N_Input } from "lib/@types";
import React, { Dispatch } from "react";
import { validator } from "../index";

type Params<T> = {
  valid: { realtime: boolean; blur: boolean };
  props: N_Input.Props;
  onChange: (e: T) => void;
  value: string;
  state: { type: string; error: N_Input.Error };
  setState: { type: Dispatch<string>; error: Dispatch<string | string[]> };
};

const getHandlers = <T>(params: Params<T>) => {
  const { valid, props, state, onChange, setState, value } = params;
  const { realtime, blur } = valid;
  const { rules, onBlur, keyEnter } = props;
  const { excute } = validator;
  const { error } = state;

  return {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (props.onChange) onChange(e as unknown as T);
      else onChange(e.target.value as unknown as T);
      const errorReset = !realtime && !excute && error;
      const isRealTime = realtime && rules;
      // REAL TIME VALID EFFECT #############################################
      if (isRealTime) {
        const noRequired = rules.filter((el) => el !== "required");
        const { errorMessage } = excute(noRequired, e.target.value);
        setState.error(errorMessage);
      } // 리얼타임이 아닐시 에러가 없으면 error 초기화
      if (errorReset) setState.error("");
    },
    onBlur: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (blur && rules) {
        const { errorMessage } = validator.excute(rules, e.target.value);
        setState.error(errorMessage);
      }
      onBlur(e);
    },
    onKeyEnter: (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === "Enter") keyEnter(value);
    },
  };
};

export default getHandlers;
