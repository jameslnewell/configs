# @jameslnewell/typescript-config

A [`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) according to my preferences. Requires TypeScript 6 or later, targets TypeScript 7 (the native Go compiler) and enables stricter checks on top of `strict`, e.g. `erasableSyntaxOnly`, `verbatimModuleSyntax` and `exactOptionalPropertyTypes`.

## Installation

```bash
npm i -D @jameslnewell/typescript-config typescript@^7
```

> **Using `@jameslnewell/eslint-config` too?** typescript-eslint can't use TypeScript 7 yet, so install it [side-by-side with the TypeScript 6 API](../eslint-config/README.md#typescript-7) instead.

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

The config uses `"module": "NodeNext"` with `verbatimModuleSyntax`, so:

- set `"type": "module"` in `package.json`, otherwise `.ts` files are CommonJS and every `import`/`export` is an error
- relative imports need file extensions (`./utils.js`, or `./utils.ts` with `rewriteRelativeImportExtensions`)

For code that's bundled (e.g. by Vite), override both options together:

```json
{
  "extends": "@jameslnewell/typescript-config",
  "compilerOptions": {
    "module": "Preserve",
    "moduleResolution": "Bundler"
  }
}
```
