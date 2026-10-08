---
'@jameslnewell/eslint-config': major
---

Remove `eslint-plugin-import` and its resolvers, and leave checking imports to `tsc`. ESLint no longer checks that imports resolve or export what's imported in any file, so make sure you run `tsc` too. Duplicate imports are now reported by ESLint's built-in `no-duplicate-imports` rule (as an error, instead of `import/no-duplicates` as a warning), which allows a separate `import type` alongside a value import from the same module in TypeScript files. `import/export` and `import/no-named-as-default` are no longer reported.

To migrate, remove any `eslint-disable` comments for `import/*` rules, and any `import/*` rules or `import/resolver` settings from your ESLint config, otherwise ESLint reports `Definition for rule 'import/...' was not found`.
