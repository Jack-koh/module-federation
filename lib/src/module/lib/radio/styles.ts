// import styled, { css } from "styled-components";

// export const Item = styled.div``;

// export const Group = styled.div<Styles>`
//   display: flex;
//   flex-direction: column;
//   &.disabled {
//     opacity: 0.6;
//     ${Item} {
//       opacity: 1 !important;
//     }
//   }

//   ${Item} {
//     &.disabled {
//       opacity: 0.6;
//     }

//     .radio-box-text {
//       height: ${({ height }) => `${height ?? 14}px`};
//       font-size: ${({ fontSize }) => `${fontSize ?? 11}px`};
//       line-height: ${({ height }) => `${height ?? 14}px`};
//     }
//   }

//   ${({ width }) => {
//     if (width) {
//       if (typeof width === "string") {
//         return css`
//           width: ${width};
//         `;
//       }
//       return css`
//         width: ${width}px;
//       `;
//     }
//     return "";
//   }}
// `;
