/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames";
import { isValidElement, ReactElement } from "react";
import { Position } from "lib/@types";

export const convertDigit = (epoch: number, digit: number): number => {
  const stringEpoch = Math.floor(epoch).toString();
  if (digit === 10 && stringEpoch.length === 13) return Math.floor(+stringEpoch / 1000);
  if (digit === 13 && stringEpoch.length === 10) return Math.floor(+stringEpoch * 1000);
  return Math.floor(epoch);
};

// epoch 시간을 utc 시간으로 변환
export const timeFormatFromUTCEpoch = (
  epoch: string | number | null,
  formatType: number,
): string => {
  const doubleDigit = (n: number): string | number => (n < 10 ? `0${n}` : n);
  if (!epoch) return "-";
  const epochUTC = convertDigit(epoch ? +epoch : 0, 10);
  const d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(epochUTC);
  const yyyy = d.getFullYear();
  const MM = d.getMonth() + 1;
  const dd = d.getDate();
  const hh = d.getHours();
  const mm = d.getMinutes();
  const ss = d.getSeconds();
  // prettier-ignore
  if (localStorage.getItem("language") === "en") {
    switch(formatType) {
      case 1: return `${doubleDigit(MM)}/${doubleDigit(dd)}/${yyyy} ${doubleDigit(hh)}:${doubleDigit(mm)}:${doubleDigit(ss)}`;
      case 2: return `${doubleDigit(MM)}/${doubleDigit(dd)}/${yyyy} ${doubleDigit(hh)}:${doubleDigit(mm)}`;
      case 3: return `${doubleDigit(MM)}/${doubleDigit(dd)}/${yyyy}`;
      case 10: return `${doubleDigit(hh)}:${doubleDigit(mm)}:${doubleDigit(ss)}`;
      default: break;
    }
  } else {
    switch(formatType) {
      case 1: return `${yyyy}-${doubleDigit(MM)}-${doubleDigit(dd)} ${doubleDigit(hh)}:${doubleDigit(mm)}:${doubleDigit(ss)}`;
      case 2: return `${yyyy}-${doubleDigit(MM)}-${doubleDigit(dd)} ${doubleDigit(hh)}:${doubleDigit(mm)}`;
      case 3: return `${yyyy}-${doubleDigit(MM)}-${doubleDigit(dd)}`;
      case 4: return `${yyyy}-${doubleDigit(MM)}`;
      case 10: return `${doubleDigit(hh)}:${doubleDigit(mm)}:${doubleDigit(ss)}`;
      default: break;
    }
  }
  return "-";
};

export const cx = classNames;

export const isUndefinded = <T>(arg: T): boolean => arg === undefined;
export const isObject = (element: unknown) => (typeof element === "object" ? element : null);
export const isFunction = (element: unknown) => (typeof element === "function" ? element : null);

export const isElement = (element: unknown) => {
  if (isValidElement(isObject(element))) return element as ReactElement;
  return null;
};
export const isJSXElement = (element: unknown) => {
  const el = isElement(element);
  return el && el.type === "string" ? el : null;
};

export const isComponent = (component: unknown, type = "function"): JSX.Element | null => {
  const comp = isElement(component);
  if (comp && isFunction(comp.type)) {
    const isClass = /^class\s/.test(String(comp.type));
    if (type === "class" && isClass) return comp;
    if (type === "function" && !isClass) return comp;
  }
  return null;
};

export const getElement = (arg: unknown): JSX.Element | null => {
  let result: null | JSX.Element = null;
  const comp = isComponent(arg);
  const isClass = isComponent(comp, "class");
  if (comp) {
    const el = arg as JSX.Element;
    if (isClass) result = isClass.type.prototype.render(el.props);
    else result = el.type(el.props);
  } else result = arg as JSX.Element;

  return isComponent(result) ? getElement(result) : result;
};

export const positionHandler = (params: {
  position: Position;
  gap: number;
  anchor?: Element | null;
  root?: HTMLElement | null;
}): void => {
  const { gap, anchor, root } = params;
  let { position } = params;
  if (!anchor) return console.warn("anchor 이 존재하지 않습니다");
  if (!root) return console.warn("root가 존재하지 않습니다");
  const anchorRect: DOMRect = anchor.getBoundingClientRect();

  const d_gap = gap;
  const d_bottom = anchorRect.bottom + d_gap;
  const d_top = anchorRect.top - root.clientHeight - d_gap;
  const d_left = anchorRect.left - root.clientWidth - d_gap;
  const d_right = anchorRect.right + d_gap;

  const v_center = anchorRect.top + anchorRect.height / 2 - root.clientHeight / 2; // prettier-ignore
  const v_top = anchorRect.top;
  const v_bottom = anchorRect.bottom - root.clientHeight;

  const h_center = anchorRect.left + anchorRect.width / 2 - root.clientWidth / 2; // prettier-ignore
  const h_left = anchorRect.left;
  const h_right = anchorRect.right - root.clientWidth;

  const setPosition = (standard: string, value: { direction: number; align: number }): void => {
    let { align, direction } = value;
    const replace = (x: string | RegExp, y: string) => position.replace(x, y) as Position;
    if (standard === "horizontal") {
      // direction = 윈도우에서 떨어진 x 값, align = 윈도우에서 떨어진 y값
      if (align + root.clientHeight >= window.innerHeight - 10) {
        align = v_bottom;
        position = replace(/(center|top)/, "bottom");
      }
      if (align < 0) {
        align = v_top;
        position = replace(/(center|bottom)/, "top");
      }
      if (direction < 0) {
        direction = d_right;
        position = replace("left", "right");
      }
      if (direction + root.clientWidth >= window.innerWidth - 10) {
        direction = d_left;
        position = replace("right", "left");
      }

      root.style.left = `${direction + window.pageXOffset - window.scrollX}px`;
      root.style.top = `${align + window.pageYOffset - window.scrollY}px`;
    }
    if (standard === "virtical") {
      // direction = 윈도우에서 떨어진 y값, align = 윈도우에서 떨어진 x 값
      if (direction + root.clientHeight >= window.innerHeight - 10) {
        direction = d_top;
        position = replace("bottom", "top");
      }

      if (direction < 0) {
        direction = d_bottom;
        position = replace("top", "bottom");
      }

      if (align < 0) {
        align = h_left;
        position = replace(/(center|right)/, "left");
      }

      if (align + root.clientWidth >= window.innerWidth - 10) {
        align = h_right;
        position = replace(/(center|left)/, "right");
      }

      root.style.left = `${align + window.pageXOffset - window.scrollX}px`;
      root.style.top = `${direction + window.pageYOffset - window.scrollY}px`;
    }
  };

  // prettier-ignore
  switch (position) {
    case 'left top': setPosition('horizontal', { direction: d_left, align: v_top }); break;
    case 'left center': setPosition('horizontal', { direction: d_left, align: v_center }); break;
    case 'left bottom': setPosition('horizontal', { direction: d_left, align: v_bottom }); break;
    case 'right top': setPosition('horizontal', { direction: d_right, align: v_top }); break;
    case 'right center': setPosition('horizontal', { direction: d_right, align: v_center }); break;
    case 'right bottom': setPosition('horizontal', { direction: d_right, align: v_bottom }); break;
    case 'bottom left': setPosition('virtical', { direction: d_bottom, align: h_left }); break;
    case 'bottom center': setPosition('virtical', { direction: d_bottom, align: h_center }); break;
    case 'bottom right': setPosition('virtical', { direction: d_bottom, align: h_right }); break;
    case 'top left': setPosition('virtical', { direction: d_top, align: h_left }); break;
    case 'top center': setPosition('virtical', { direction: d_top, align: h_center }); break;
    case 'top right': setPosition('virtical', { direction: d_top, align: h_right }); break;
  }
};
