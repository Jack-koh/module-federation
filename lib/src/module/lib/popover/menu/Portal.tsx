import React, { useEffect, useRef } from "react";
import { Render } from "lib/module/lib/hoc";
import { cx } from "lib/module/lib/functions";
import { useClickOutSide } from "lib/module/lib/hook";
import { cn } from "../Popover";
import { positionHandler as p } from "lib/module/lib/functions";
import { Menu } from "./Menu";

function Portal(props: Menu & { anchor: Element }) {
  const { state, content, position, gap, anchor, clickInside, clickOutside, className } = props;
  const { toggle, setToggle } = state;
  const ref = useRef(null);
  const portalRoot = anchor?.closest(".jk__popover__poper__content") as Element;
  if (!portalRoot)
    throw new Error("Failed root element type: The root 'element' for 'portal' is undefined");
  const closeHandler = () => setToggle(false);

  useClickOutSide({
    toggle,
    active: clickOutside,
    target: [ref.current],
    closeHandler,
  });

  const clickInsideHandler = clickInside && {
    role: "button",
    tabIndex: 0,
    onKeyPress: closeHandler,
    onClick: closeHandler,
  };

  useEffect(() => {
    const positionHandler = () => p.bind(null, { position, gap, anchor, root: ref.current });

    if (toggle) {
      positionHandler();
      window.addEventListener("resize", positionHandler); // 윈도우 리사이즈시 위치 다시 조정
      document.addEventListener("scroll", positionHandler, true); // 다큐먼트 스크롤시 위치 다시 조정
    } else {
      window.removeEventListener("resize", positionHandler); // 윈도우 리사이즈시 위치 다시 조정
      document.removeEventListener("scroll", positionHandler, true); // 다큐먼트 스크롤시 위치 다시 조정
    }
  }, [toggle]);

  return (
    <div ref={ref} {...clickInsideHandler} className={cx(cn.concat("__menu"), { className })}>
      <Render className={cx(cn.concat("__menu__content"))}>
        {content({ closeHandler, open: toggle, anchor })}
      </Render>
    </div>
  );
}

export default Portal;
