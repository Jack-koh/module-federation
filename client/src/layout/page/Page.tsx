import React from "react";
import { Outlet } from "react-router-dom";
import Navigator from "./navigator/Navigator";
import "./Page.scss";

export const Page: React.FC = () => {
  return (
    <div id="jk-ui-components-demo-layout">
      <section id="navigator-section">
        <i id="jk-logo">로고</i>
        <Navigator />
      </section>
      <main id="main-content">
        <Outlet />
      </main>
    </div>
  );
};
