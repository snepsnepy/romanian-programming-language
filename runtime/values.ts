//* Values is gonna define the types that we're gonna use at runtime

export type ValueType = "null" | "number" | "boolean" | "string";

export interface RuntimeVal {
  type: ValueType;
}

export interface NullVal extends RuntimeVal {
  type: "null";
  value: null;
}

export function MK_NULL() {
  return { type: "null", value: null } as NullVal;
}

export interface NumberVal extends RuntimeVal {
  type: "number";
  value: number;
}

export interface StringVal extends RuntimeVal {
  type: "string",
  value: string
}

export function MK_NUMBER(n = 0) {
  return { type: "number", value: n } as NumberVal;
}

export interface BoolVal extends RuntimeVal {
  type: "boolean",
  value: boolean
}

export function MK_BOOL(bool = true) {
  return { type: "boolean", value: bool } as BoolVal;
}