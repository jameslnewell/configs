---
'@jameslnewell/eslint-config': patch
---

Leave checking imports in TypeScript files to `tsc` by turning off the `eslint-plugin-import` rules it duplicates (`import/no-unresolved`, `import/named`, `import/namespace`, `import/default` and `import/no-named-as-default-member`), so imports which only resolve through the tsconfig e.g. `customConditions` no longer fail linting
