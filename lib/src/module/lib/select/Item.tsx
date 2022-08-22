import React, { useContext } from "react";
import { cx } from "lib/module/lib/functions";
import { omit } from "lodash";
import { SelectContext } from "./Select";
import { N_Select } from "lib/@types";
import { cn } from "./Select";

function Item(props: N_Select.Item.Props) {
  const { multiple, selected, setSelected, onChange, setToggle } = useContext(SelectContext);
  const { label, value, index, children, options, setOptions, className } = props;

  const singleHandler = () => {
    const assign = [...options];

    if (selected.size) {
      const key = [...selected.keys()][0];
      const data = selected.get(key);
      if (data) {
        assign[key] = { ...assign[key], selected: false };
        selected.delete(key);
      }
    }

    assign[index] = { label, value, selected: true };
    setSelected(new Map([[index, assign[index]]]));

    onChange(assign);
    setOptions(assign);
    setToggle(false);
  };

  const multipleHandler = () => {
    const assign = [...options];
    const modify = !props.selected;
    assign[index] = { label, value, selected: modify };

    modify ? selected.set(index, assign[index]) : selected.delete(index);
    setSelected(new Map(selected));
    onChange(assign);
    setOptions(assign);
  };

  const onClickHandler = () => {
    if (!multiple) singleHandler();
    if (multiple) multipleHandler();
  };

  return (
    <div
      {...omit(props, ["value", "label", "selected", "options", "setOptions"])}
      role="button"
      tabIndex={0}
      className={cx(cn.concat("__item"), { selected: props.selected, [className]: className })}
      onKeyPress={onClickHandler}
      onClick={onClickHandler}>
      {children ? children : label}
    </div>
  );
}
Item.displayName = "JK_SELECT_ITEM";
const defaultProps: N_Select.Item.DefaultProps = {
  className: "",
  label: "",
  value: "",
  selected: false,
  options: [],
  setOptions() {/* prettier-ignore */},
};
Item.defaultProps = defaultProps;

export default Item;
