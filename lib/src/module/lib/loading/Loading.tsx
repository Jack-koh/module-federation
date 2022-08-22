/* eslint-disable react/function-component-definition */
import React from "react";
import * as Icons from "lib/module/lib/Icons";

export const Loading: React.FC = (): JSX.Element => (
  <div className="jk__loading">
    <div className="jk__loading__back" />
    <div className="jk__loding__inner__spinner">
      <Icons.Loading className="loading__spinner" />
    </div>
  </div>
);

export function Proccessing() {
  return (
    <div className="jk__proccessing">
      <div className="on__proccessing">
        <div className="rect__aling_1" />
        <div className="rect__aling_2" />
        <div className="rect__aling_3" />
        <div className="rect__aling_4" />
        <div className="rect__aling_5" />
      </div>
    </div>
  );
}

export const Waiting: React.FC<{ loading: boolean }> = ({ loading }): JSX.Element =>
  loading ? (
    <div className="jk__waiting__loading">
      <div className="waiting_first" />
      <div className="waiting_second" />
      <div className="waiting_third" />
    </div>
  ) : (
    <></>
  );
