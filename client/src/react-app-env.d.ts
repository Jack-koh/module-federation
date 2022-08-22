/// <reference types="react-scripts" />

declare type AtLeastOne<T> = { [K in keyof T]: Pick<T, K> }[keyof T];
declare module "lib/components";
