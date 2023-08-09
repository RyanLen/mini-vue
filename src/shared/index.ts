export * from "./toDisplayString";

export const EMPTY_OBJ = {};

export const extend = Object.assign;

export const isObject = (val) => {
  return val !== null && typeof val === "object";
};

export const isString = (value) => typeof value === "string";

export const hasChanged = (val, newVal) => !Object.is(val, newVal);

export const hasOwn = (val, key) =>
  Object.prototype.hasOwnProperty.call(val, key);

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const toHandlerKey = (str: string) =>
  str ? "on" + capitalize(str) : "";

export const camelize = (str: string) =>
  str.replace(/-(\w)/g, (_, c: string) => (c ? c.toUpperCase() : ""));

export const isOn = (key: string) => /^on[A-Z]/.test(key);
