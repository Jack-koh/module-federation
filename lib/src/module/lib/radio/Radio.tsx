import React from "react";
import { Render, ChildMap } from "lib/module/lib/hoc";
import { cx, isUndefinded } from "lib/module/lib/functions";
import { useControl } from "lib/module/lib/hook";
import * as Icons from "lib/module/lib/Icons";
import { N_Radio } from "lib/@types";

const cn = "jk__radio";

function RadioGroup<T>(props: N_Radio.Group.Props<T>): JSX.Element {
  const { children, value, className, disabled } = props;
  const [checked, onChange] = useControl(
    { state: value, dispatcher: props.onChange },
    isUndefinded(value) ? 0 : value,
  );

  return (
    <div className={cx(cn.concat("__group"), { [className]: className, disabled })}>
      {ChildMap(children, (child, index) => {
        if (child.type.displayName !== "JK_RADIO") {
          console.warn("Radio 컴포넌트만 Group에 사용할수 있습니다.");
          return <></>;
        }

        const onClick = () => {
          if (disabled) return;
          onChange(child.props.value ?? index);
        };

        return (
          <Render role="button" tabIndex={0} onClick={onClick} onKeyDown={onClick}>
            {React.cloneElement(child, {
              ...child.props,
              checked: isUndefinded(child.props.value)
                ? (checked as unknown as number) === index
                : checked === child.props.value,
            })}
          </Render>
        );
      })}
    </div>
  );
}

const groupDefaultProps: N_Radio.Group.DefaultProps<unknown> = {
  className: "",
  disabled: false,
};
RadioGroup.defaultProps = groupDefaultProps;

function Radio<T>(props: N_Radio.Props<T>) {
  const { text, className, disabled, checked } = props;

  return (
    <div className={cx(cn.concat("__item"), { [className]: className, disabled, checked })}>
      <div className={cx(cn.concat("__box"), { [className]: className })}>
        {checked && <Icons.RadioChecked />}
        {!checked && <Icons.RadioCircle />}
        <span className={cx(cn.concat("__text"))}>{text}</span>
      </div>
    </div>
  );
}

const readioDefaultProps: N_Radio.DefaultProps = { className: "", checked: false };
Radio.defaultProps = readioDefaultProps;
Radio.displayName = "JK_RADIO";
Radio.Group = RadioGroup;

export default Radio;
