import React from "react";
import { N_Modal } from "lib/@types";
import { cx } from "lib/module/lib/functions";
import { cn } from "./Modal";

export function Summary(props: N_Modal.Summary.Props) {
  const { id, children, className } = props;
  return (
    <div id={id} style={props.st} className={cx(cn.concat("__title"), { [className]: className })}>
      {children}
    </div>
  );
}

const summaryDefaultProps: N_Modal.Summary.DefaultProps = { children: "Title", className: "" };
Summary.defaultProps = summaryDefaultProps;

export function Actions(props: N_Modal.Actions.Props) {
  const { id, children, className } = props;
  return (
    <div
      id={id}
      style={props.st}
      className={cx(cn.concat("__actions"), { [className]: className })}>
      {children}
    </div>
  );
}

const actionsDefaultProps: N_Modal.Actions.DefaultProps = { children: "Actions", className: "" };
Actions.defaultProps = actionsDefaultProps;

export function Content(props: N_Modal.Content.Props) {
  const { id, children, className } = props;
  return (
    <div
      id={id}
      style={props.st}
      className={cx(cn.concat("__content"), { [className]: className })}>
      {children}
    </div>
  );
}

const contentDefaultProps: N_Modal.Content.DefaultProps = { children: <></>, className: "" };
Content.defaultProps = contentDefaultProps;
