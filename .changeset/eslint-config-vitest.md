---
'@jameslnewell/eslint-config': major
---

Replace Jest support with Vitest and move to the latest tooling.

- Swap `eslint-plugin-jest` for `@vitest/eslint-plugin` in the test-files config. **BREAKING:** `**/*.test.*` files are now linted with Vitest rules instead of Jest rules.
- Upgrade to ESLint 10 via `eslint-plugin-import-x` (the maintained, flat-config/ESLint-10 successor to `eslint-plugin-import`), plus `typescript-eslint` 8.63.
- Target TypeScript 6.0 (the latest TypeScript that `typescript-eslint` supports).
- Fix the `files` list so the published tarball actually ships `index.mjs` and `node.mjs` (previously `["config.mjs"]`, which shipped nothing usable).

Because the `@jameslnewell/*` config packages are version-locked, they are all released together at this major.
