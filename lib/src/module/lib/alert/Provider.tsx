import React, { useState } from "react";
import { N_Alert } from "lib/@types";
import { Context } from "./Alert";

function Provider(props: N_Alert.Provider.Props) {
  const [alert, setAlert] = useState<N_Alert.Alert[]>([]);
  const set = (payload: N_Alert.Provider.Payload) => {
    const { text, status = "info" } = payload;
    setAlert([...alert, { text, status, id: new Date().getTime() }]);
  };

  const remove = (id: number) => setAlert((prev) => prev.filter((el) => el.id !== id));
  const clear = () => setAlert([]);

  return (
    <Context.Provider value={{ alert, set, remove, clear }}>{props.children}</Context.Provider>
  );
}

export default Provider;
