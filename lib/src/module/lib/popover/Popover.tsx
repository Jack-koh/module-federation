import React, { useRef } from "react";
import { useControl } from "lib/module/lib/hook";
import { Render } from "lib/module/lib/hoc";
import { cx } from "lib/module/lib/functions";
import Menu from "./menu/Menu";
import Poper from "./poper/Poper";
import { N_Popover } from "lib/@types";

export const cn = "jk__popover";

function Popover(props: N_Popover.Props) {
  const { children, disabled } = props;
  const [toggle, setToggle] = useControl(
    { state: props.toggle, dispatcher: props.onChange },
    false,
  );
  const ref = useRef<Element>(null);
  const isMenu = ref.current?.closest(".jk__popover__poper");
  const T = isMenu ? Menu : Poper;

  return (
    <T {...props} anchor={ref.current} state={{ toggle, setToggle }}>
      <Render
        ref={ref}
        className={cx(cn.concat("__button"))}
        onClick={() => {
          if (!disabled) setToggle(!toggle);
        }}>
        {children}
      </Render>
    </T>
  );
}

const defaultProps: N_Popover.DefaultProps = {
  transition: true,
  disabled: false,
  children: <></>,
  className: "",
  gap: 12,
  position: "bottom left",
  // eslint-disable-next-line
  content: (_args: { closeHandler: () => void; open: boolean; anchor: Element }) => <></>,
  clickOutside: false,
  clickInside: false,
};
Popover.defaultProps = defaultProps;

export default Popover;
