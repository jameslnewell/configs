# @jameslnewell/typescript-config

Creates a [`tsconfig.base.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) file according to my preferences.

## Installation

NPM:

```bash
npm install --dev @jameslnewell/typescript-config
npm exec -p @jameslnewell/typescript-config -- create-typescript-config
```

## Usage

```json
{
  "extends": "@jameslnewell/typescript-config",
  "include": ["src"]
}
```
