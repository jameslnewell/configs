# @jameslnewell/eslint-config

## 7.0.0

### Major Changes

- ae713dc: Support TypeScript 7 (the native Go compiler) and replace Jest with Vitest.

  - `@jameslnewell/typescript-config` requires TypeScript 6 or later, targets TypeScript 7 and turns on the newer stricter checks: `erasableSyntaxOnly`, `verbatimModuleSyntax`, `allowUnreachableCode: false` and `allowUnusedLabels: false`. Options which are already the default since TypeScript 6 (e.g. `alwaysStrict`, `esModuleInterop`, `noUncheckedSideEffectImports`, `isolatedModules` and the individual `strict*` flags) are no longer set. Projects need `"type": "module"`.
  - `@jameslnewell/eslint-config` replaces `eslint-plugin-jest` with `@vitest/eslint-plugin`, enables type-aware linting for every TypeScript file via the nearest `tsconfig.json`, and actually publishes `index.mjs` and `node.mjs` (exposed as `@jameslnewell/eslint-config` and `@jameslnewell/eslint-config/node`). typescript-eslint needs the TypeScript 6 API, so install it side-by-side with TypeScript 7, see the README.
  - `@jameslnewell/vitest-config` is new and replaces `@jameslnewell/jest-preset`.
