import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Render } from "lib/module/lib/hoc";
import { cx } from "lib/module/lib/functions";
import { useClickOutSide } from "lib/module/lib/hook";
import { cn } from "../Popover";
import { positionHandler as p } from "lib/module/lib/functions";
import { Poper } from "./Poper";

function Portal(props: Poper & { anchor: Element }) {
  const { state, content, position, gap, anchor, className, clickInside, clickOutside } = props;
  const { toggle, setToggle } = state;

  const body = document.querySelector("body") as HTMLElement;
  const ref = useRef(null);
  const closeHandler = () => setToggle(false);

  useClickOutSide({
    active: clickOutside,
    target: [anchor, ref.current],
    closeHandler,
  });

  const clickInsideHandler = clickInside && {
    role: "button",
    tabIndex: 0,
    onKeyPress: closeHandler,
    onClick: closeHandler,
  };

  useEffect(() => {
    if (ref.current) {
      const positionHandler = p.bind(null, { position, gap, anchor, root: ref.current });
      if (props.state.toggle) {
        positionHandler();

        window.addEventListener("resize", positionHandler); // 윈도우 리사이즈시 위치 다시 조정
        document.addEventListener("scroll", positionHandler, true); // 다큐먼트 스크롤시 위치 다시 조정
      } else {
        window.removeEventListener("resize", positionHandler); // 윈도우 리사이즈시 위치 다시 조정
        document.removeEventListener("scroll", positionHandler, true); // 다큐먼트 스크롤시 위치 다시 조정
      }
    }
  }, [toggle]);

  return createPortal(
    <div ref={ref} {...clickInsideHandler} className={cx(cn.concat("__poper"), { className })}>
      <Render className={cx(cn.concat("__poper__content"))}>
        {content({ closeHandler, open: toggle, anchor })}
      </Render>
    </div>,
    body,
  );
}

export default Portal;
