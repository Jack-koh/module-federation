/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-use-before-define */
/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
  Dispatch,
} from "react";
import classNames from "classnames";
import styled from "styled-components";
import { debounce } from "lodash";
import Button from "../button/Button";

const debounceGetError = debounce((target, resolve) => {
  const errorList = target.getElementsByClassName("jk__validator__error__message");
  if (![...errorList].length) resolve(true);
}, 0);
const getErrorElements = (target: HTMLElement): Promise<boolean> =>
  new Promise((resolve) => {
    debounceGetError(target, resolve);
  });

// Validator Context ###############################################
export type T_Context = {
  excute: boolean;
  setExcute: Dispatch<boolean>;
  loading: boolean;
  setLoading: Dispatch<boolean>;
  isForm: boolean;
};

export const Context = createContext<T_Context>({
  excute: false,
  setExcute: () => false,
  loading: false,
  setLoading: () => false,
  isForm: false,
});

// Validator Provier ###############################################

export function Provider(props: Props) {
  const [excute, setExcute] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isForm] = useState(!!props.form);
  const validatorRef = useRef(null);

  const submitHandler = useCallback(
    (target: HTMLElement) => {
      getErrorElements(target).then((result) => {
        if (result) props.onSubmit();
        debounceGetError.cancel();
      });
    },
    [props.onSubmit],
  );

  useEffect(() => {
    if (excute) {
      if (validatorRef.current) submitHandler(validatorRef.current);
      setExcute(false);
    }
  }, [excute, props.onSubmit, submitHandler]);

  return (
    <Context.Provider value={{ excute, setExcute, loading, setLoading, isForm }}>
      {props.form ? (
        <form
          ref={validatorRef}
          id={props.id}
          className={classNames(
            "validator__form",
            props.className && { [props.className]: props.className },
          )}
          onSubmit={(e: React.FormEvent<HTMLFormElement>): void => {
            e.preventDefault();
            setExcute(true);
          }}>
          {props.children}
        </form>
      ) : (
        <div
          ref={validatorRef}
          id={props.id}
          className={classNames("validator__form", {
            [props.className]: props.className,
          })}>
          {props.children}
        </div>
      )}
    </Context.Provider>
  );
}

Provider.defaultProps = { className: "" };
type Props = {
  onSubmit: () => void;
  children: React.ReactNode;
  form?: boolean;
  className?: string;
  id?: string;
} & typeof Provider.defaultProps;
// Validator Submit ###############################################

type Submit = {
  loading?: boolean;
  text?: string;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  // style rest ########################
  st?: React.CSSProperties;
};

export function Submit(props: Submit & typeof Submit.defaultProps) {
  const { className, loading, disabled, children } = props;
  const state = useContext(Context);
  const { setExcute, isForm } = state;

  return (
    <Button
      st={props.st}
      className={classNames("jk__validator__button", { [className]: className })}
      type={isForm ? "submit" : "button"}
      loading={loading}
      disabled={disabled}
      onClick={(): void => {
        if (!loading && !isForm && !disabled) setExcute(true);
      }}>
      {children}
    </Button>
  );
}

// Error 컴포넌트
const ErrorMessage = styled.div<{ top: number | string }>`
  top: ${({ top }) => {
    if (typeof top === "string") return top;
    return `${top + 4}px`;
  }};
`;

export const Error: React.FC<{
  error: string | string[];
  top?: number | string;
}> = ({ error, top = 32 }) => {
  if (!error) return <></>;
  if (Array.isArray(error) && !error.length) return <></>;

  return (
    <ErrorMessage className="jk__validator__error__message" top={top}>
      {typeof error === "string"
        ? error
        : error.map((item, index) => <div key={index}>{item}</div>)}
    </ErrorMessage>
  );
};

Submit.defaultProps = {
  className: "",
  loading: false,
  disabled: false,
  children: "Button",
  onClick() {},
};
