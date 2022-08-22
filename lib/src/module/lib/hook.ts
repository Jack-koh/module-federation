import { useState, useEffect, useRef } from "react";
import { isUndefinded } from "./functions";

// controlled 와 uncontrolled 상태를 분석해서 사용할 상태와 함수를 리턴
export const useControl = <T, U>(
  controlled: { state?: T; dispatcher?: (state: U) => void },
  defaultValue?: T,
): [T, (state: U) => void] => {
  const unControlled = useState(controlled.state ?? defaultValue);

  const omission = {
    state: isUndefinded(controlled.state) && !isUndefinded(controlled.dispatcher),
    dispatcher: isUndefinded(controlled.dispatcher) && !isUndefinded(controlled.state),
  };

  if (omission.dispatcher) console.warn("controlled dispatcher 가 설정되지 않았습니다.");
  if (omission.state) console.warn("controlled state 값이 설정되지 않았습니다.");

  return controlled.state !== undefined && controlled.dispatcher !== undefined
    ? [controlled.state, controlled.dispatcher]
    : [unControlled[0] as T, unControlled[1] as unknown as (state: U) => void];
};

interface props {
  toggle?: boolean;
  active?: boolean;
  target: Element | (Element | null)[] | null;
  closeHandler: () => void;
}

export const useClickOutSide = (props: props): void => {
  const { toggle, active = true, target, closeHandler } = props;

  useEffect(() => {
    const clickOutsideHandler = (e: MouseEvent) => {
      const list = [target, Array.from(document.getElementsByClassName("jk__modal"))].flat();
      const et = e.target as Node;
      if (target) {
        for (const t of list) if (t && t.contains(et)) return;
      }
      closeHandler();
    };

    if (active) document.addEventListener("mousedown", clickOutsideHandler);
    return (): void => {
      document.removeEventListener("mousedown", clickOutsideHandler);
    };
  }, [target, toggle]);
};

export const useMount = (f: () => void, dep: unknown[]): void => {
  const isFirstRun = useRef(false);

  useEffect(() => {
    if (isFirstRun.current) f();
    if (!isFirstRun.current) isFirstRun.current = true;
  }, dep);
};
