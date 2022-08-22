import React from "react";
import { CSSTransition } from "react-transition-group";
import Portal from "./Portal";
import { N_Popover } from "lib/@types";

export type Poper = N_Popover.Props & {
  anchor: Element | null;
  state: { toggle: boolean; setToggle: (toggle: boolean) => void };
};

function Poper(props: Poper) {
  const { state, disabled, anchor } = props;

  return (
    <>
      {props.children}
      <CSSTransition
        in={!!(state.toggle && !disabled && anchor)}
        unmountOnExit
        timeout={props.transition ? 100 : 0}>
        <Portal {...props} anchor={anchor as Element} />
      </CSSTransition>
    </>
  );
}

export default Poper;
