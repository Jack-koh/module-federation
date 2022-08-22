import styled, { css } from 'styled-components';
import { Styles } from './TextArea';

export const TextAreaElement = styled.textarea`
  outline: none;
  resize: none;
  border: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
  font-family: inherit;

  ::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #c5c6ca;
    border-radius: 25px 25px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #c5c6ca;
  }
`;

export const ScrollWrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 4px 6px;
`;

export const Container = styled.div<Styles & { readonly?: boolean; disabled: boolean; error: string | string[] }>`
  position: relative;
  height: ${({ height }) => `${height ?? 100}px`};
  border: ${({ border }) => border ?? '1px solid #e6e6e6'};
  border-radius: ${({ radius }) => (radius ? `${radius}px` : undefined)};
  background-color: ${({ backgroundColor }) => backgroundColor ?? '#ffffff'};
  transition: all 0.2s ease;
  width: ${({ width }) => {
    if (typeof width === 'string') return width;
    return `${width ?? 300}px`;
  }};
  height: ${({ height }) => {
    if (typeof height === 'string') return height;
    return `${height ?? 40}px`;
  }};

  ${TextAreaElement} {
    background-color: transparent;
    padding: ${({ padding = 4 }) => `${padding}px`};
    font-size: ${({ fontSize }) => `${fontSize ?? 14}px`};
    color: ${({ color }) => color ?? '#191919'};
    line-height: ${({ lineHeight }) => `${lineHeight ?? 20}px`};
    width: 100%;
    height: 100%;

    &::placeholder {
      color: ${({ placeholderColor }) => placeholderColor ?? '#c5c6ca'};
      font-size: ${({ fontSize }) => `${fontSize ?? 14}px`};
    }
  }

  &:focus {
    background-color: ${({ focus }) => focus?.backgroundColor};
    border-color: ${({ focus }) => focus?.borderColor};
  }

  &:hover {
    background-color: ${({ hover }) => hover?.backgroundColor};
  }

  &::placeholder {
    color: ${({ placeholderColor }) => placeholderColor ?? '#c5c6ca'};
    font-size: ${({ fontSize }) => `${fontSize ?? 14}px`};
  }

  ${({ error }) => {
    const multiErr = Array.isArray(error);
    if ((error && !multiErr) || (multiErr && error.length)) {
      return css`
        border: 1px solid #ff5974 !important;
      `;
    }
    return '';
  }}

  ${({ disabled, readonly }) => {
    if (readonly) {
      return css`
        background-color: #f5f5f5;
        ${TextAreaElement} {
          background-color: #f5f5f5;
        }
      `;
    }
    if (disabled) {
      return css`
        background-color: #f5f5f5;
        color: #a5adba;
        ${TextAreaElement} {
          background-color: #f5f5f5;
          color: #a5adba;
        }
      `;
    }
    return '';
  }}
`;
