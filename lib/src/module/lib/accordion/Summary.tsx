import React, { useContext } from "react";
import { cx } from "lib/module/lib/functions";
import { ArrowDown } from "lib/module/lib/Icons";
import { AccordionContext, cn } from "lib/module/lib/accordion/Accordion";
import { N_Accordion } from "lib/@types";

function Summary(props: N_Accordion.Summary.Props) {
  const { id, children, className } = props;
  const { disabled, expanded, toggleOnRow, onChange } = useContext(AccordionContext);

  const onChangeHandler = () => {
    onChange(!expanded);
  };

  const a11y = {
    role: "button",
    tabIndex: 0,
    onKeyPress: onChangeHandler,
    onClick: onChangeHandler,
  };

  return (
    <div
      id={id}
      {...(toggleOnRow && a11y)}
      className={cx(cn.concat("__summary"), {
        [className]: className,
        button: !disabled && toggleOnRow,
      })}>
      <div className={cx(cn.concat("__content"))}>{children}</div>
      <ArrowDown
        {...(!toggleOnRow && a11y)}
        className={cx(cn.concat("__icon"), { button: !disabled && !toggleOnRow })}
      />
    </div>
  );
}

const defaultProps: N_Accordion.Summary.DefaultProps = {
  children: <></>,
  expandIcon: <ArrowDown />,
  className: "",
};
Summary.defaultProps = defaultProps;
Summary.displayName = "JK_ACCORDION_SUMMARY";

export default Summary;
