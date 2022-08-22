/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-shadow */
import React, { useState, useEffect, useRef, useContext } from "react";
import classNames from "classnames";
import { keys, debounce } from "lodash";
import styled from "styled-components";
import { CheckBox, ToolTip } from "../index";
import { M_Table } from "./table.model";
import { tableHandler, Extention } from "./check";
import Context from "./Context";
import { resizeHandler } from "./resize";

// Functions ##################################################
const align = (column: M_Table.header) => {
  let align: React.CSSProperties = {};
  if (column.align === "right") align = { justifyContent: "flex-end" };
  if (column.align === "center") align = { justifyContent: "center" };
  return align;
};

// Table Wrapper ##################################################
export type Styles = {
  width?: number | string;
  height?: number | string;
};

export const TableWrapper = styled.div<Styles>`
  position: relative;
  background-color: #fff;
  width: ${({ width }) => {
    if (typeof width === "string") return width;
    return width ? `${width}px` : "100%";
  }};
  height: ${({ height }) => {
    if (typeof height === "string") return height;
    return height ? `${height}px` : "100%";
  }};
`;

// Th Comp ##################################################
export const Order: React.FC<{
  property: string;
  config: M_Table.config.order;
}> = ({ config, property }) => {
  const { sort } = config;
  const orderKey = keys(sort)[0];
  const ordering = sort[orderKey];
  const desc = orderKey === property && ordering === "DESC";
  const asc = orderKey === property && ordering === "ASC";
  return <i className={classNames("jk_table__order__icon", { desc, asc })} />;
};

type ITh = {
  children: JSX.Element | string;
  column: M_Table.header;
  index: number; // hidden 숨기기전 원래 index
  isLast: boolean;
};

export const Th: React.FC<ITh> = ({ children, column, isLast, index }) => {
  const { setState, resize, config: { order } } = useContext(Context); // prettier-ignore
  const config = order as M_Table.config.order;
  const { property, width, flex } = column;
  const isOrderable = column.order;
  const style: React.CSSProperties = { width, flex: !width ? flex ?? 1 : undefined }; // prettier-ignore
  const cellAlign = align(column); // cell 정렬

  const orderHandler = () => {
    if (config && isOrderable) {
      const { sort, onClick } = config;
      const sortKey = keys(sort)[0];
      let assign: "DESC" | "ASC" = "DESC";
      assign = sort[sortKey] === "ASC" ? "DESC" : "ASC";
      if (property !== sortKey) assign = "DESC";
      onClick({ [property]: assign });
    }
  };

  return (
    <div style={style} className={classNames("jk_table__th", { order: isOrderable })}>
      <div className="jk_table__th__context" style={cellAlign} onClick={orderHandler}>
        <div className="jk_table__text">{children}</div>
        {isOrderable && config && <Order config={config} property={property} />}
      </div>
      {!isLast && resize && (
        <div className="resizer__grap" onMouseDown={(e) => resizeHandler(index, e, setState)} />
      )}
    </div>
  );
};

function ThCheck<T>(): JSX.Element {
  const { data, config: { check }} = useContext(Context); // prettier-ignore
  const { choice, onChange, disabled, type = "infinite" } = check as M_Table.config.check<T>;
  const { include, exclude, isAllCheck } = choice;

  const checked = () => {
    let checked = 0;
    if (type === "pagination") {
      if (data.length > 0 && include.length === data.length) checked = 1; // 전체 체크
      if (include.length > 0 && include.length < data.length) checked = 2;
      if (include.length === 0) checked = 0;
    } else {
      const sum = include.length + exclude.length;
      checked = !sum ? isAllCheck : 2;
    }

    return checked;
  };

  return (
    <CheckBox
      checked={checked()}
      className="ssr-table-th-check"
      st={{ width: 18, height: 18 }}
      disabled={!data.length}
      onChange={(check): void => {
        const assign = tableHandler.allCheck({ data, check, disabled, type });
        onChange(assign);
      }}
    />
  );
}

interface IHead {
  children: (payload: { value: M_Table.header }) => JSX.Element | string;
}
export function Head(props: IHead) {
  const { state: { header }, config } = useContext(Context); // prettier-ignore
  const filtered = [];
  for (let i = 0; i < header.length; i += 1) {
    if (!header[i].hidden) filtered.push({ ...header[i], oi: i });
  }

  return (
    <>
      {config.check && <ThCheck />}
      {filtered.map((column, i) => (
        <Th
          key={column.property}
          column={column}
          isLast={filtered.length - 1 === i}
          index={column.oi}>
          {props.children({ value: column })}
        </Th>
      ))}
    </>
  );
}
export const Body: React.FC<{
  children: (payload: { index: number }) => React.ReactNode;
}> = ({ children }) => {
  const { data } = useContext(Context); // prettier-ignore
  return <>{data.map((el, index) => children({ index }))}</>;
};
type ITd = {
  column: M_Table.header;
  value: string;
  children: React.ReactNode;
};

export const Td: React.FC<ITd> = ({ column, value, children }) => {
  const { state: { windowSize } } = useContext(Context); // prettier-ignore
  const tdRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<number>();
  const { width, flex, toolTip } = column;
  const style: React.CSSProperties = { width, flex: !width ? flex ?? 1 : undefined }; // prettier-ignore
  const cellAlign = align(column); // cell 정렬

  useEffect(() => {
    const timer = debounce(() => setSize(tdRef?.current?.clientWidth), 0);
    if (toolTip && tdRef.current) timer();
    return () => timer.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tdRef.current, windowSize]);

  return (
    <div style={style} className="jk_table__td">
      <div ref={tdRef} style={cellAlign} className="jk_table__td__context">
        <ToolTip
          position="bottom left"
          content={value}
          ellipsis={size}
          disabled={!toolTip}
          maxWidth={400}>
          {/* title={toolTip ? undefined : value} */}
          <div className="text-node">{children}</div>
        </ToolTip>
      </div>
    </div>
  );
};

interface IRowCheck<T> {
  data: T[];
  index: number;
  config: M_Table.config.check<T>;
}
function RowCheck<T>(props: IRowCheck<T>): JSX.Element {
  const { config, index, data } = props;
  const { choice, onChange, disabled, type } = config;
  const rowData = data[props.index] as Extention<T>;
  let disable = false;

  if (disabled) {
    if (Array.isArray(disabled)) {
      for (const item of disabled) {
        disable = item.value === rowData[item.key];
        if (disable) break;
      }
    } else disable = disabled.value === rowData[disabled.key];
  }

  const checked = () => {
    if (disable) return 0;
    if (rowData.state?.selected === undefined) throw new Error("아이템에 select 속성이 없습니다.");
    return rowData.state.selected ? 1 : 0;
  };

  return (
    <CheckBox
      checked={checked()}
      disabled={disable}
      className="ssr-table-row-check"
      onChange={(check): void => {
        const assign = tableHandler.check({ data, index, check, choice, type });
        onChange(assign);
      }}
    />
  );
}

interface Row {
  className?: string;
  children: React.ReactNode;
  styles?: React.CSSProperties;
  onClick?: () => void;
}

export function Row(props: Row): JSX.Element {
  return (
    <li
      className={classNames("jk_table__row", {
        [props.className as string]: props.className,
      })}
      style={props.styles}
      onClick={props.onClick}>
      <>{props.children}</>
    </li>
  );
}

interface Tr {
  className?: string;
  children: (payload: {
    rowData: any;
    property: string;
    value: string | number;
  }) => JSX.Element | string | number;
  index: number;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function Tr(props: Tr) {
  const { config, state: { header }, data } = useContext(Context); // prettier-ignore
  const rowData = data[props.index];

  return (
    <div className="jk_table__tr" style={props.style}>
      {config.check && <RowCheck data={data} index={props.index} config={config.check} />}
      {header
        .filter((el) => !el.hidden)
        .map((column) => {
          const { property } = column;
          const value = rowData[property];
          return (
            <Td key={column.property} column={column} value={value}>
              {props.children({ rowData, property, value })}
            </Td>
          );
        })}
    </div>
  );
}
