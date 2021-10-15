# @jameslnewell/typescript-config

Creates a [`tsconfig.base.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) file according to my preferences.

## Installation

Yarn:

```bash
yarn dlx -p @jameslnewell/typescript-config create-editor-config
```

NPM:

```bash
npx -p @jameslnewell/typescript-config create-editor-config
```

## Usage

Create a `tsconfig.json` that extends `tsconfig.base.json`.

```json
{
  "extends": "tsconfig.base.json",
  "compilerOptions": {
    "declaration": true,
    "outDir": "dist",
    "target": "CommonJS"
  },
  "include": ["src"]
}
```
