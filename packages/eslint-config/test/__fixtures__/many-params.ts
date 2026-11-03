export function add(a: number, b: number, c: number): number {
  return a + b + c;
}

export const subtract = (a: number, b: number, c: number): number => a - b - c;

export const operations = {
  multiply(a: number, b: number, c: number): number {
    return a * b * c;
  },
};

export function overloaded(a: number, b: number, c: number): number;
export function overloaded(a: number, b?: number, c?: number): number {
  return a + (b ?? 0) + (c ?? 0);
}

export abstract class Calculator {
  abstract divide(a: number, b: number, c: number): number;
}

export interface Divider {
  remainder(a: number, b: number, c: number): number;
  modulo: (a: number, b: number, c: number) => number;
}

export type Power = (a: number, b: number, c: number) => number;

declare function memoize<T extends (...args: never[]) => unknown>(fn: T): T;

export const memoized = memoize((a: number, b: number, c: number) => a + b + c);

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const loose: Function = (a: number, b: number, c: number) => a + b + c;
