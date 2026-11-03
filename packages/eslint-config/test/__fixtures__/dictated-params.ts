export const total = [1, 2, 3].reduce(
  (sum, value, index) => sum + value * index,
  0,
);

// stands in for a third-party type e.g. Express' `ErrorRequestHandler`
// eslint-disable-next-line @jameslnewell/prefer-options-object
type Handler = (error: Error, request: string, response: string) => void;

export const handler: Handler = (error, request, response) => {
  console.log(error, request, response);
};

export const handlers: {handle: Handler} = {
  handle(error, request, response) {
    console.log(error, request, response);
  },
};

export const handlersByName: Record<string, Handler> = {
  'on-error'(error, request, response) {
    console.log(error, request, response);
  },
};

// stands in for a third-party base class e.g. Node's `Transform`
export abstract class Stream {
  // eslint-disable-next-line @jameslnewell/prefer-options-object
  abstract transform(chunk: string, encoding: string, done: () => void): void;
}

export class Upper extends Stream {
  transform(chunk: string, encoding: string, done: () => void): void {
    console.log(chunk.toUpperCase(), encoding);
    done();
  }
}

interface Counter {
  count: number;
}

export function withThis(this: Counter, a: number, b: number): number {
  return this.count + a + b;
}

export class Service {
  constructor(
    private readonly a: number,
    private readonly b: number,
    private readonly c: number,
  ) {}

  sum(): number {
    return this.a + this.b + this.c;
  }
}

export function sum({a, b, c}: {a: number; b: number; c: number}): number {
  return a + b + c;
}
