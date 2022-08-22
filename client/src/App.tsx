import React from "react";
import { createRoot } from "react-dom/client";
import Router from "router/Router";
import { BrowserRouter } from "react-router-dom";
import "lib/scss";
import "./reset.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
