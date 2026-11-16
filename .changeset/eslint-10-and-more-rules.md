---
'@jameslnewell/eslint-config': major
---

Support ESLint 10 and add rules

BREAKING CHANGE: ESLint 10 is required. The `eslint` peer dependency is now `^10.0.0` (not `^9.33.0`) because `@eslint/js` 10 only supports ESLint 10, so keeping ESLint 9 would mean pinning the old `@eslint/js` and its recommended rules. `@eslint/js` 10 also enables `no-unassigned-vars`, `no-useless-assignment` and `preserve-caught-error`.

BREAKING CHANGE: new rules are enabled, so existing code may now report errors (many are fixable with `eslint --fix`):

- all files: `import/first`, `import/newline-after-import`, `node/prefer-node-protocol`, `@stylistic/spaced-comment`
- JavaScript files: `no-var`, `prefer-const`
- JavaScript and TypeScript ESM files (not `.cjs`/`.cts`): `import/no-commonjs`
- TypeScript files: `import/consistent-type-specifier-style` (`prefer-top-level`), `@typescript-eslint/consistent-type-imports`, `@typescript-eslint/method-signature-style` (`method`), `@typescript-eslint/no-shadow` (replacing `no-shadow`)

The `import/*` rules come from `eslint-plugin-import-x` (the only import plugin that supports ESLint 10), registered as `import` and without any resolver settings, so `tsc` is still the only thing resolving imports. New dependencies: `eslint-plugin-import-x`, `eslint-plugin-n` and `@stylistic/eslint-plugin`.

`import/no-commonjs` also flags `.js` files in a `type: commonjs` package, so rename those to `.cjs`.
