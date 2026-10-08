# @jameslnewell/eslint-config

A [`eslint`](https://eslint.org/) config according to my preferences.

## Installation

```bash
npm i -D eslint @jameslnewell/eslint-config
```

## Usage

Create `eslint.config.mjs`:

```js
export {default} from '@jameslnewell/eslint-config/node';
```

Update `package.json`:

```json
{
  "scripts": {
    "lint": "eslint ."
  }
}
```

TypeScript files are linted with type information from the `tsconfig.json` nearest to each file, so make sure every linted TypeScript file (including tests) is included in a `tsconfig.json`.

ESLint doesn't check that imports resolve or export what's imported, in any file, because `tsc` already reports these using your `tsconfig.json` (e.g. `paths` and `customConditions`), so make sure you run `tsc` too.

Test files (`*.test.*`) are linted with the [Vitest](https://vitest.dev/) rules.

## Configs

- `@jameslnewell/eslint-config` — JavaScript and TypeScript
- `@jameslnewell/eslint-config/node` — as above, plus Node.js globals

## TypeScript 7

TypeScript 7 doesn't ship a JavaScript API yet, which [`typescript-eslint`](https://typescript-eslint.io/) needs. Until it does, install TypeScript 7 alongside the TypeScript 6 API, as [recommended by the TypeScript team](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-rc/):

```json
{
  "devDependencies": {
    "typescript": "npm:@typescript/typescript6@^6.0.2",
    "@typescript/native": "npm:typescript@^7.0.2"
  }
}
```

`tsc` will run TypeScript 7 while `typescript-eslint` imports the TypeScript 6 API from `typescript`.

## Migrating to v8

`eslint-plugin-import` has been removed, so ESLint now reports `Definition for rule 'import/...' was not found` for any `import/*` rules left in your project:

- remove `eslint-disable` comments for `import/*` rules
- remove `import/*` rules and `import/resolver` settings from your `eslint.config.*`

Duplicate imports are now reported by ESLint's built-in [`no-duplicate-imports`](https://eslint.org/docs/latest/rules/no-duplicate-imports) rule, which allows a separate `import type` alongside a value import from the same module in TypeScript files.
