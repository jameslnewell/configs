---
'@jameslnewell/typescript-config': major
'@jameslnewell/eslint-config': major
'@jameslnewell/vitest-config': major
---

Support TypeScript 7 (the native Go compiler) and replace Jest with Vitest.

- `@jameslnewell/typescript-config` targets TypeScript 7 and turns on the newer stricter checks: `erasableSyntaxOnly`, `verbatimModuleSyntax`, `noUncheckedSideEffectImports`, `allowUnreachableCode: false`, `allowUnusedLabels: false` and `libReplacement: false`. Options which are now the default or are removed in TypeScript 7 (`alwaysStrict`, `esModuleInterop`, `allowSyntheticDefaultImports` and the individual `strict*` flags) are no longer set.
- `@jameslnewell/eslint-config` replaces `eslint-plugin-jest` with `@vitest/eslint-plugin`, enables type-aware linting for every TypeScript file via the nearest `tsconfig.json`, and actually publishes `index.mjs` and `node.mjs` (exposed as `@jameslnewell/eslint-config` and `@jameslnewell/eslint-config/node`). typescript-eslint needs the TypeScript 6 API, so install it side-by-side with TypeScript 7, see the README.
- `@jameslnewell/vitest-config` is new and replaces `@jameslnewell/jest-preset`.
