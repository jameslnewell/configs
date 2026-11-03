declare function legacy(a: string, b: number, c: boolean): void;

declare const emit: (a: string, b: number, c: boolean) => void;

declare class Legacy {
  run(a: string, b: number, c: boolean): void;
}

declare module 'legacy' {
  export function other(a: string, b: number, c: boolean): void;
}

export {legacy, emit, Legacy};
