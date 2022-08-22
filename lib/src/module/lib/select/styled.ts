/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import styled from "styled-components";

// const dynamicCSSButton = (args: Styles) => {
//   const merge: { [key: string]: string } = {};
//   if (args.width) merge.width = typeof args.width === "string" ? args.width : `${args.width}px`;
//   if (args.height)
//     merge.height = typeof args.height === "string" ? args.height : `${args.height}px`;
//   if (args.fontSize) merge["font-size"] = `${args.fontSize}px`;
//   if (args.radius) merge["border-radius"] = `${args.radius}px`;
//   let string = "";
//   for (const key in merge) string += `${key}: ${merge[key]} !important;`;
//   return string;
// };

// export const dynamicCSSOptions = (args: Pick<Styles, "radius" | "optionsHeight">) => {
//   const merge: { [key: string]: string } = {};
//   if (args.radius) merge["border-radius"] = `${args.radius}px`;
//   if (args.optionsHeight)
//     merge.height =
//       typeof args.optionsHeight === "string" ? args.optionsHeight : `${args.optionsHeight}px`;
//   let string = "";
//   for (const key in merge) string += `${key}: ${merge[key]} !important;`;
//   return string;
// };

// export const SelectContainer = styled.div<Styles>`
//   .jk__select__button {
//     ${dynamicCSSButton}
//   }

//   .jk__select__options {
//     ${dynamicCSSOptions}

//     .jk__select__item {
//       ${({ itemHeight }) => {
//         if (itemHeight) return `${itemHeight}px`;
//         return "";
//       }}
//     }
//   }
// `;
