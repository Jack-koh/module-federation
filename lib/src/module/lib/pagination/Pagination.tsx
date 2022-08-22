/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
/* eslint-disable react/function-component-definition */
import React from "react";
import classNames from "classnames";

export interface Pagination {
  info: { current: number; total: number };
  format: { limit: number; offset: number };
}

interface Props {
  pagination: Pagination;
  onChange: (pagination: Pagination) => void;
}

export const Pagination: React.FC<Props> = ({ pagination, onChange }) => {
  const { offset, limit } = pagination.format;
  const { total, current } = pagination.info;
  const pageChaper = Math.floor(current / 10) * 10;

  const pagingHandler = (offset: number) =>
    onChange({
      info: { ...pagination.info, current: offset / limit + 1 },
      format: { ...pagination.format, offset },
    });

  const chapter = [...Array(total)].slice(pageChaper, pageChaper + 10);

  const items = chapter.map((_, i) => {
    const index = i + pageChaper;
    return (
      <div
        key={index}
        className={classNames("pagination-item", {
          active: current - 1 === index,
        })}
        onClick={(): void => pagingHandler(index * limit)}>
        {index + 1}
      </div>
    );
  });

  return (
    <div className="jk__pagination">
      <div className="jk__pagination__buttons">
        <div className="jk__left__arrow__start" onClick={() => pagingHandler(0)}>
          <i />
        </div>
        <div
          className="jk__left__arrow"
          onClick={(): void => {
            const offset = (current - 2) * limit;
            pagingHandler(offset < 0 ? 0 : offset);
          }}>
          <i />
        </div>
        <div className="jk__page__items">{items}</div>
        <div
          className="jk__right__arrow"
          onClick={() => {
            pagingHandler(offset / limit + 1 < total ? offset + limit : offset);
          }}>
          <i />
        </div>
        <div className="jk__right__arrow__end" onClick={() => pagingHandler((total - 1) * limit)}>
          <i />
        </div>
      </div>
    </div>
  );
};
