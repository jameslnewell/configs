# @jameslnewell/eslint-config

## 9.0.0

### Major Changes

- b253e05: Support ESLint 10 and add rules

  BREAKING CHANGE: ESLint 10 is required. The `eslint` peer dependency is now `^10.0.0` (not `^9.33.0`) because `@eslint/js` 10 only supports ESLint 10, so keeping ESLint 9 would mean pinning the old `@eslint/js` and its recommended rules. `@eslint/js` 10 also enables `no-unassigned-vars`, `no-useless-assignment` and `preserve-caught-error`.

  BREAKING CHANGE: new rules are enabled, so existing code may now report errors (many are fixable with `eslint --fix`):

  - all files: `@stylistic/padding-line-between-statements` (a blank line after imports), `node/prefer-node-protocol`, `@stylistic/spaced-comment`
  - JavaScript files: `no-var`, `prefer-const`
  - TypeScript files: `@typescript-eslint/consistent-type-imports`, `@typescript-eslint/method-signature-style` (`method`), `@typescript-eslint/no-shadow` (replacing `no-shadow`)

  New dependencies: `eslint-plugin-n` and `@stylistic/eslint-plugin`.

## 8.0.0

### Major Changes

- 9713578: Remove `eslint-plugin-import` and its resolvers, and leave checking imports to `tsc`. ESLint no longer checks that imports resolve or export what's imported in any file, so make sure you run `tsc` too, with `allowJs` and `checkJs` enabled if you want JavaScript files checked. Duplicate imports are now reported by ESLint's built-in `no-duplicate-imports` rule (as an error, instead of `import/no-duplicates` as a warning), which allows a separate `import type` alongside a value import from the same module in TypeScript files. `import/export` and `import/no-named-as-default` are no longer reported.

  To migrate, remove any `eslint-disable` comments for `import/*` rules, and any `import/*` rules or `import/resolver` settings from your ESLint config, otherwise ESLint reports `Definition for rule 'import/...' was not found`.

### Patch Changes

- 5e7e78d: Allow functions and classes as test titles in TypeScript test files e.g. `describe(myFunction, ...)`

## 7.0.0

### Major Changes

- ae713dc: Support TypeScript 7 (the native Go compiler) and replace Jest with Vitest.

  - `@jameslnewell/typescript-config` requires TypeScript 6 or later, targets TypeScript 7 and turns on the newer stricter checks: `erasableSyntaxOnly`, `verbatimModuleSyntax`, `allowUnreachableCode: false` and `allowUnusedLabels: false`. Options which are already the default since TypeScript 6 (e.g. `alwaysStrict`, `esModuleInterop`, `noUncheckedSideEffectImports`, `isolatedModules` and the individual `strict*` flags) are no longer set. Projects need `"type": "module"`.
  - `@jameslnewell/eslint-config` replaces `eslint-plugin-jest` with `@vitest/eslint-plugin`, enables type-aware linting for every TypeScript file via the nearest `tsconfig.json`, and actually publishes `index.mjs` and `node.mjs` (exposed as `@jameslnewell/eslint-config` and `@jameslnewell/eslint-config/node`). typescript-eslint needs the TypeScript 6 API, so install it side-by-side with TypeScript 7, see the README.
  - `@jameslnewell/vitest-config` is new and replaces `@jameslnewell/jest-preset`.
