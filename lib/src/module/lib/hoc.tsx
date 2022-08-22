/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Children, forwardRef } from "react";
import { getElement, cx } from "./functions";

type Props = {
  [key: string]: unknown;
} & React.MouseEventHandler &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

export const Render = forwardRef<Element, Props>((props, ref) => {
  const { children: c, className = "", onClick, onKeyDown, ...rest } = props;

  const children = getElement(c) || <></>;
  const isFragment = children?.type?.toString() === "Symbol(react.fragment)";
  const child = isFragment ? <div>{children}</div> : children;
  const clone = React.cloneElement(child, {
    ...children.props,
    ...rest,
    ref,
    className: cx({
      [className]: !!className,
      [children.props.className]: !!children.props.className,
    }),
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      if (onClick) onClick(e);
      if (children.props.onClick) children.props.onClick(e);
    },
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
      if (onKeyDown) onKeyDown(e);
      if (children.props.onKeyDown) children.props.onKeyDown(e);
    },
  });

  return clone;
});

Render.displayName = "Render";

export function ChildMap(
  children: JSX.Element[],
  f: (child: JSX.Element, index: number) => JSX.Element,
) {
  return <>{Children.map(children, f)}</>;
}
