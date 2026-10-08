# @jameslnewell/typescript-config

A [`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) according to my preferences. Targets TypeScript 7 (the native Go compiler) and enables its stricter checks, e.g. `erasableSyntaxOnly`, `verbatimModuleSyntax` and `noUncheckedSideEffectImports`.

## Installation

```bash
npm i -D @jameslnewell/typescript-config typescript@^7
```

> Using `@jameslnewell/eslint-config` too? See [using TypeScript 7 with typescript-eslint](../eslint-config/README.md#typescript-7).

## Usage

Create `tsconfig.json`:

```json
{
  "extends": "@jameslnewell/typescript-config",
  "compilerOptions": {
    "types": ["node"]
  },
  "include": ["src"]
}
```

Since TypeScript 6, `types` defaults to `[]`, so list the global types your project needs (e.g. `node`, `vitest/globals`).
