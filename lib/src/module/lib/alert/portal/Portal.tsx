import React, { useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cx } from "lib/module/lib/functions";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { N_Alert } from "lib/@types";
import Text from "./Text";
import { Context, cn } from "../Alert";
import { positionHandler as p } from "lib/module/lib/functions";

const Portal = (props: N_Alert.Portal.Props) => {
  const rootRef = useRef(null);
  const body = document.querySelector("body") as HTMLBodyElement;
  const { alert } = useContext(Context);

  useEffect(() => {
    const positionHandler = (): void => {
      if (props.anchor && rootRef.current) {
        const { position, gap, anchor } = props;
        const { current } = rootRef;
        p({ position, gap, anchor, root: current });
      }
    };
    positionHandler();
    window.addEventListener("resize", positionHandler); // 윈도우 리사이즈시 위치 다시 조정
    return () => {
      window.removeEventListener("resize", positionHandler); // 윈도우 리사이즈시 위치 다시 조정
    };
  }, [rootRef.current]);

  const list = (
    <div ref={rootRef} className={cx(cn.concat("__wrapper"))}>
      <TransitionGroup className={cx(cn.concat("__list"))}>
        {alert.map((item: N_Alert.Alert) => (
          <CSSTransition in key={item.id} timeout={props.transition ? 500 : 0}>
            <Text item={item} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );

  return createPortal(list, body);
};

export default Portal;
