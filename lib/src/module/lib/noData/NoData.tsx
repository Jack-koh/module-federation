/* eslint-disable react/require-default-props */
/* eslint-disable react/function-component-definition */
import React from "react";
import styled from "styled-components";

const Text = styled.div<{ text?: string }>`
  &::before {
    display: block;
    content: "${(props) => props.text ?? ""}";
  }
`;

export const NoData: React.FC<{ text?: string }> = ({ text }) => (
  <div id="jk__no__data">
    <div className="content__wrapper">
      <div className="jk__no__data__icon" />
      {!!text && <Text className="jk__no__data__text" text={text} />}
    </div>
  </div>
);
