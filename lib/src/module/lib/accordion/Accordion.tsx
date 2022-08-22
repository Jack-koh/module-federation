import { cx } from "lib/module/lib/functions";
import { useControl } from "lib/module/lib/hook";
import React, { createContext, isValidElement } from "react";
import { CSSTransition } from "react-transition-group";
import { N_Accordion } from "lib/@types";
import Summary from "./Summary";
import Collapse from "./Collapse";

// 모듈에 사용되는 클래스명의 접두사
export const cn = "jk__accordion";

// Accordion Context
export const AccordionContext = createContext({
  disabled: false,
  expanded: false,
  toggleOnRow: false,
  // eslint-disable-next-line
  onChange: (_expanded: boolean) => { /* prettier-ignore */ },
});

/*
  PROPS EXPLANATION

  - children: Accordion 컴포넌트가 렌더링 할 자식 요소.

  자식요소들을 탐색후 Summary와 Typography만 추출해서 사용하기때문에
  타이틀 영역: Accordion.Summary 컴포넌트를 사용
  컨텐츠 영역: Accordion.Typography 컴포넌트를 사용.

  ========================

    <Accordion {...props}>
      <Accordion.Summary>label</Accordion.Summary>
      <Accordion.Typography>
        { ...contents }
      </Accordion.Typography>
    </Accordion>

  ========================

  - className: 사용자 지정 클래스.
  - expanded: Accordion 활성화 여부
  - toggleOnRow: 이 키워드를 사용하면 Summary 영역 전체가 expand 활성화 버튼이 된다.
  - onChange: 사용자 지정 함수.
*/

function Accordion(props: N_Accordion.Props) {
  const { id, transition, disabled, children, className, toggleOnRow } = props;

  /*
    UnControlled
    *** 외부에서 바인딩 된 값이 없어도 내부 상태를 이용하여 Accordion 기능 활성화.

    Controlled
    *** Accordion 을 작동시키기 위해서는 외부상태에 의존해야하기때문에
        외부에서 전달받은 expanded 상태와
        expanded 상태를 변경시킬수 있는 onChagne함수를 이용해서
        외부상태와 바인딩이 이루어져야 한다.
  */

  const [expanded, onChange] = useControl(
    { state: props.expanded, dispatcher: props.onChange },
    false,
  );

  const Element = (() => {
    const result = { Summary: <></>, Collapse: <></> };
    React.Children.forEach(children, (child) => {
      const warn = () =>
        console.warn("Summary 와 Collapse 컴포넌트 외의 다른 컴포넌트는 표출되지 않습니다.");
      if (isValidElement(child) && typeof child.type !== "string") {
        const { displayName } = child.type as typeof child.type & {
          displayName?: string;
        };
        if (displayName === "JK_ACCORDION_SUMMARY") result.Summary = child;
        else if (displayName === "JK_ACCORDION_COLLAPSE") {
          result.Collapse = child;
        } else warn();
      } else warn();
    });
    return result;
  })();

  return (
    <AccordionContext.Provider
      value={{
        expanded,
        disabled,
        toggleOnRow,
        onChange: (expanded: boolean) => {
          if (!disabled) onChange(expanded);
        },
      }}>
      <div id={id} className={cx(cn, { [className]: className, expanded, disabled })}>
        {Element.Summary}
        <CSSTransition in={expanded} unmountOnExit timeout={transition ? 400 : 0}>
          <div className={cx(cn.concat("__transition"))}>{Element.Collapse}</div>
        </CSSTransition>
      </div>
    </AccordionContext.Provider>
  );
}

const defaultProps: N_Accordion.DefaultProps = {
  disabled: false,
  children: <></>,
  className: "",
  transition: true,
  toggleOnRow: false,
};

Accordion.defaultProps = defaultProps;

Accordion.Summary = Summary;
Accordion.Collapse = Collapse;

export default Accordion;
