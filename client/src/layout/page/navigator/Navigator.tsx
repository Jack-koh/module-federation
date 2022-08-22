import React, { useReducer } from "react";
import { NavLink } from "react-router-dom";
import { Accordion } from "lib/module/lib";
import produce from "immer";
import "./Navigator.scss";

type Action = { type: "expanded"; payload: boolean };

interface State {
  expanded: boolean;
}

const initialState: State = {
  expanded: true,
};

const reducer = (state: State, action: Action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "expanded":
        draft["expanded"] = action.payload;
    }
  });
};

const Navigator: React.FC = () => {
  const [state, setState] = useReducer(reducer, initialState);
  const { expanded } = state;

  return (
    <nav id="gnb">
      <Accordion toggleOnRow expanded={expanded} onChange={() => setState({ type: "expanded", payload: !expanded })}>
        <Accordion.Summary>Components</Accordion.Summary>
        <Accordion.Collapse>
          <NavLink to="/components/react-accordion">accordion</NavLink>
          <NavLink to="/components/react-alert">alert</NavLink>
          <NavLink to="/components/react-autoComplete">autoComplete</NavLink>
          <NavLink to="/components/react-button">button</NavLink>
          <NavLink to="/components/react-checkBox">checkBox</NavLink>
          <NavLink to="/components/react-dropZone">dropZone</NavLink>
          <NavLink to="/components/react-input">input</NavLink>
          <NavLink to="/components/react-loading">loading</NavLink>
          <NavLink to="/components/react-modal">modal</NavLink>
          <NavLink to="/components/react-noData">noData</NavLink>
          <NavLink to="/components/react-pagination">pagination</NavLink>
          <NavLink to="/components/react-popover">popover</NavLink>
          <NavLink to="/components/react-radio">radio</NavLink>
          <NavLink to="/components/react-resizer">resizer</NavLink>
          <NavLink to="/components/react-search">search</NavLink>
          <NavLink to="/components/react-select">select</NavLink>
          <NavLink to="/components/react-slider">slider</NavLink>
          <NavLink to="/components/react-switch">switch</NavLink>
          <NavLink to="/components/react-table">table</NavLink>
          <NavLink to="/components/react-textArea">textArea</NavLink>
          <NavLink to="/components/react-toolTip">toolTip</NavLink>
        </Accordion.Collapse>
      </Accordion>
    </nav>
  );
};

export default Navigator;
