import React, { useState } from "react";
import styled, { css } from "styled-components";
import classNames from "classnames";
import { pick } from "lodash";
import { Input } from "../index";

export type Styles = {
  width?: number | string;
  height?: number | string;
  fontSize?: number;
  radius?: number;
};

interface Props {
  submitHandler?: (searchText: string) => void;
  placeholder?: string;
  value?: string;
  onChange?: (searchText: string) => void;
  styles?: Styles;
  className?: string;
}

const Form = styled.div<Styles>`
  ${(args) => {
    const merge: { [key: string]: string } = {};
    if (args.width)
      merge["width"] = typeof args.width === "string" ? args.width : `${args.width}px`;
    if (args.height)
      merge["height"] = typeof args.height === "string" ? args.height : `${args.height}px`;
    let string = "";
    for (const key in merge) string += `${key}: ${merge[key]} !important;`;
    return string;
  }}

  .jk__input {
    ${() => {
      return css`
        width: inherit;
        height: inherit;
      `;
    }}
  }
`;

function Search(props: Props) {
  const { submitHandler = () => false, className = "" } = props;
  const [value, setValue] = useState(props.value ?? "");
  const [focus, setFocus] = useState(false);

  return (
    <Form
      {...pick(props.styles, ["width", "height"])}
      className={classNames("jk__search__form__field", { [className]: className, focus })}>
      <Input
        placeholder={props.placeholder}
        onChange={(e) => setValue(e.target.value)}
        keyEnter={submitHandler}
        onFocus={() => {
          console.log("focus");
          if (!focus) setFocus(true);
        }}
        onBlur={() => focus && setFocus(false)}
      />
      <button className="search-button" type="button" onClick={() => submitHandler(value)}>
        <i />
      </button>
    </Form>
  );
}

export default Search;
