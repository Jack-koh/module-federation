/* eslint-disable react/function-component-definition */
/* eslint-disable react/require-default-props */
import React, { useContext, useEffect, useReducer } from "react";
import classNames from "classnames";
import { produce } from "immer";
import Validator, { validator, Rules } from "../validator";
import { Container, TextAreaElement, ScrollWrapper } from "./styled";

type ChangeFuncType = (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
export type Styles = {
  width?: number | string;
  height?: number | string;
  padding?: number;
  backgroundColor?: string;
  fontSize?: number;
  border?: string;
  color?: string;
  placeholderColor?: string;
  radius?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  lineHeight?: number;
  margin?: string;
  hover?: Partial<{
    backgroundColor?: string;
  }>;
  focus?: Partial<{
    backgroundColor?: string;
    borderColor?: string;
  }>;
};
export interface Props {
  className?: string;
  innerRef?: React.RefObject<HTMLTextAreaElement> | null;
  // 발리데이터
  rules?: Rules[];
  validType?: "realtime" | "blur";
  error?: string | string[] | null;
  styles?: Styles;
  // ...rest #################
  disabled?: boolean;
  placeholder?: string | undefined;
  value?: string;
  readonly?: boolean;
  onChange?: ChangeFuncType;
  onFocus?: () => void;
  onBlur?: () => void;
  keyEnter?: (value: string) => void;
  onClick?: () => void;
}

export type actions =
  | { type: "value"; value: string }
  | { type: "error"; value: string | string[] }
  | { type: "focus"; value: boolean };

export interface State {
  error: string | string[];
  value: string;
  focus: boolean;
}
const initialState: State = { error: "", value: "", focus: false };
// prettier-ignore
const reducer = (state: State, action: actions): State => {
  return produce(state, (draft: State): void => {
    switch(action.type) {
      case 'error': draft['error'] = action.value; break;
      case 'value': draft['value'] = action.value; break;
      case 'focus': draft['focus'] = action.value; break;
    }
  });
};

const TextArea: React.FC<Props> = (props): JSX.Element => {
  const [state, setState] = useReducer(reducer, initialState, (init) => ({
    ...init,
    value: props.value ?? "",
  }));
  const validatorState = useContext(Validator.Context);
  const { excute } = validatorState;

  const onBlurHandler = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    if (props.validType === "blur" && props.rules && !props.disabled) {
      const { errorMessage } = validator.excute(props.rules, e.currentTarget.value);
      setState({ type: "error", value: errorMessage });
    }
    if (props.onBlur) props.onBlur();
    setState({ type: "focus", value: false });
  };

  // Error 리셋
  useEffect(() => {
    if (props.error) setState({ type: "error", value: props.error });
    if (state.error && !props.error) setState({ type: "error", value: "" });
  }, [props.error]);

  // 외부 value 동기화
  useEffect(() => {
    if (props.value !== undefined) {
      setState({ type: "value", value: props.value ?? "" });
      setState({ type: "error", value: "" });
    }
  }, [props.value]);

  // 비활성화시 valid error 리셋
  useEffect(() => {
    if (props.disabled) {
      // setState({ type: 'value', value: '' });
      setState({ type: "error", value: "" });
    }
  }, [props.disabled]);

  // EXCUTE EFFECT #############################################
  useEffect(() => {
    if (excute && props.rules && !props.disabled) {
      const { errorMessage } = validator.excute(props.rules, state.value);
      setState({ type: "error", value: errorMessage });
    }
  }, [excute]);

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter" && props.keyEnter) props.keyEnter(state.value);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setState({ type: "value", value });
    if (props.onChange) props.onChange(e);
    // REAL TIME VALID EFFECT #############################################
    const isRealtime = props.validType === "realtime";
    if (isRealtime && props.rules) {
      const { errorMessage } = validator.excute(props.rules, state.value);
      setState({ type: "error", value: errorMessage });
    }
    if (!isRealtime && !excute && state.error) setState({ type: "error", value: "" }); // 리얼타임이 아닐시 에러가 없으면 error 초기화
  };

  const onFocusHandler = () => {
    setState({ type: "focus", value: true });
  };

  return (
    <Container
      {...props.styles}
      readonly={props.readonly}
      disabled={!!props.disabled}
      error={state.error}
      className={classNames("jk__textarea__container", {
        [props.className as string]: props.className,
        error: state.error,
        readonly: props.readonly,
        disabled: props.disabled,
        focus: state.focus,
      })}>
      <ScrollWrapper>
        <TextAreaElement
          disabled={props.disabled}
          readOnly={props.readonly}
          value={state.value}
          ref={props.innerRef}
          onChange={onChangeHandler}
          spellCheck="false"
          className="jk__textarea"
          onBlur={onBlurHandler}
          onFocus={onFocusHandler}
          onKeyPress={onKeyPressHandler}
          placeholder={props.placeholder}
        />
      </ScrollWrapper>
      <Validator.Error
        error={state.error}
        top={typeof props.styles?.height === "number" ? props.styles?.height + 4 : 100 + 4}
      />
    </Container>
  );
};

export default TextArea;
