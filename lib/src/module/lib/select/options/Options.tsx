import React, { useState, useEffect, useRef, useContext } from "react";
import { ChildMap } from "lib/module/lib/hoc";
import Select, { SelectContext } from "../Select";
import { CSSTransition } from "react-transition-group";
import type { N_Select } from "lib/@types";
import positionHandler from "./positionHandler";

function Options(props: N_Select.Options.Props) {
  const { multiple, toggle, anchor, disabled, transition, selected, setSelected } =
    useContext(SelectContext);
  const { children, position } = props;
  const [options, setOptions] = useState<N_Select.Data[]>(
    props.options ?? children?.map((el) => el.props) ?? [],
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.options) setOptions(props.options);
  }, [props.options]);

  useEffect(() => {
    if (ref.current && anchor) {
      positionHandler({
        position,
        target: anchor,
        selectRoot: ref.current,
      });
    }
  }, [ref]);

  useEffect(() => {
    const s = (options ?? [])
      .map((el, i) => ({ data: el, index: i }))
      .filter((el) => el.data.selected);
    if (!multiple && s.length > 1) {
      throw new Error(`
          single 선택일 경우 초기 선택값은 1개만 올수 있습니다. \n
          잘못된 사용 ↓
          {..., selected: true},
          {..., selected: true}
        `);
    }
    s.forEach((item) => selected.set(item.index, item.data));
    setSelected(new Map(selected));
  }, []);

  return (
    <CSSTransition
      in={!!(toggle && !disabled && anchor)}
      unmountOnExit
      timeout={transition ? 100 : 0}>
      <div ref={ref} className="jk__select__options">
        {children
          ? ChildMap(children, (child, index) => {
              if (child.type.displayName !== "JK_SELECT_ITEM")
                throw new Error(
                  "Failed children type: The props 'children' should be Select.Item component., but its component is not Select.Item",
                );
              return React.cloneElement(child, {
                ...child.props,
                key: child.props.label,
                index: child.props?.index ?? index,
                selected: selected.get(index)?.selected,
                options,
                setOptions,
              });
            })
          : options?.map((el, i) => {
              return (
                <Select.Item
                  key={el.label}
                  {...el}
                  index={i}
                  options={options}
                  setOptions={setOptions}
                />
              );
            })}
      </div>
    </CSSTransition>
  );
}

Options.displayName = "JK_SELECT_OPTIONS";
const defaultProps: N_Select.Options.DefaultProps = { position: "bottom" };
Options.defaultProps = defaultProps;

export default Options;
