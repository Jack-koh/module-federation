import React from "react";
import { cx } from "lib/module/lib/functions";
import { cn } from "lib/module/lib/accordion/Accordion";
import { N_Accordion } from "lib/@types";

function Collapse(props: N_Accordion.Collapse.Props) {
  const { id, className, children } = props;
  return (
    <div id={id} className={cx(cn.concat("__content"), { [className]: className })}>
      {children}
    </div>
  );
}

const defaultProps: N_Accordion.Collapse.DefaultProps = { children: <></>, className: "" };
Collapse.defaultProps = defaultProps;
Collapse.displayName = "JK_ACCORDION_COLLAPSE";

export default Collapse;
