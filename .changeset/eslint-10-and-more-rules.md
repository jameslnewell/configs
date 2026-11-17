---
'@jameslnewell/eslint-config': major
---

Support ESLint 10 and add rules

BREAKING CHANGE: ESLint 10 is required. The `eslint` peer dependency is now `^10.0.0` (not `^9.33.0`) because `@eslint/js` 10 only supports ESLint 10, so keeping ESLint 9 would mean pinning the old `@eslint/js` and its recommended rules. `@eslint/js` 10 also enables `no-unassigned-vars`, `no-useless-assignment` and `preserve-caught-error`.

BREAKING CHANGE: new rules are enabled, so existing code may now report errors (many are fixable with `eslint --fix`):

- all files: `@stylistic/padding-line-between-statements` (a blank line after imports), `node/prefer-node-protocol`, `@stylistic/spaced-comment`
- JavaScript files: `no-var`, `prefer-const`
- TypeScript files: `@typescript-eslint/consistent-type-imports`, `@typescript-eslint/method-signature-style` (`method`), `@typescript-eslint/no-shadow` (replacing `no-shadow`)

New dependencies: `eslint-plugin-n` and `@stylistic/eslint-plugin`.
