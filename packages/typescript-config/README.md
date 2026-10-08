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

The config uses `"module": "NodeNext"`, so relative imports need file extensions (`./utils.js`, or `./utils.ts` with `rewriteRelativeImportExtensions`) and whether a file is ESM or CommonJS follows the `type` in `package.json`. For code that's bundled (e.g. by Vite), override both options together:

```json
{
  "extends": "@jameslnewell/typescript-config",
  "compilerOptions": {
    "module": "Preserve",
    "moduleResolution": "Bundler"
  }
}
```
