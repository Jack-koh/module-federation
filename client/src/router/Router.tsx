import React from "react";
import * as layout from "layout";
import { useRoutes } from "react-router-dom";
import * as Docs from "pages";

const Router: React.FC = () => {
  return useRoutes([
    {
      path: "/",
      element: <layout.Page />,
      children: [
        {
          path: "components",
          children: [
            {
              index: true,
              element: <Docs.Documentation />,
            },
            {
              path: "react-accordion",
              element: <Docs.Accordion />,
            },
            {
              path: "react-alert",
              element: <Docs.Alert />,
            },
            {
              path: "react-autoComplete",
              element: <div>autoComplete</div>,
            },
            {
              path: "react-button",
              element: <Docs.Button />,
            },
            {
              path: "react-checkBox",
              element: <Docs.CheckBox />,
            },
            {
              path: "react-dropZone",
              element: <div>dropZone</div>,
            },
            {
              path: "react-input",
              element: <Docs.Input />,
            },
            {
              path: "react-loading",
              element: <div>loading</div>,
            },
            {
              path: "react-modal",
              element: <Docs.Modal />,
            },
            {
              path: "react-noData",
              element: <div>noData</div>,
            },
            {
              path: "react-pagination",
              element: <div>pagination</div>,
            },
            {
              path: "react-popover",
              element: <Docs.Popover />,
            },
            {
              path: "react-radio",
              element: <Docs.Radio />,
            },
            {
              path: "react-resizer",
              element: <div>resizer</div>,
            },
            {
              path: "react-search",
              element: <div>search</div>,
            },
            {
              path: "react-select",
              element: <Docs.Select />,
            },
            {
              path: "react-slider",
              element: <div>slider</div>,
            },
            {
              path: "react-switch",
              element: <div>switch</div>,
            },
            {
              path: "react-table",
              element: <div>table</div>,
            },
            {
              path: "react-textArea",
              element: <div>textArea</div>,
            },
            {
              path: "react-toolTip",
              element: <div>toolTip</div>,
            },
          ],
        },
      ],
    },
  ]);
};

export default Router;
