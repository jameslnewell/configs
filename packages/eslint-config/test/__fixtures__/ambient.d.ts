declare function legacy(a: string, b: number, c: boolean): void;

declare module 'legacy' {
  export function other(a: string, b: number, c: boolean): void;
}
