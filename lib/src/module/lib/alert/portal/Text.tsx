import React, { useEffect, useContext } from "react";
import { debounce } from "lodash";
import { cx } from "lib/module/lib/functions";
import * as Icons from "lib/module/lib/Icons";
import { N_Alert } from "lib/@types";
import { Context, cn } from "../Alert";

function Text(props: N_Alert.Text.Props) {
  const { remove } = useContext(Context);
  const { text, status } = props.item;

  const removeHandler = (e: React.MouseEvent): void => {
    e.stopPropagation();
    remove(props.item.id);
  };

  useEffect(() => {
    const timer = debounce(() => {
      remove(props.item.id);
    }, 5000);
    timer();
    return (): void => timer.cancel();
  }, []);

  return (
    <div
      className={cx(cn.concat("__text"), {
        success: status === "success",
        error: status === "error",
        info: status === "info",
        warning: status === "warning",
      })}>
      <span>{text}</span>
      <Icons.Close className={cx(cn.concat("__close"))} onClick={removeHandler} />
    </div>
  );
}

export default Text;
