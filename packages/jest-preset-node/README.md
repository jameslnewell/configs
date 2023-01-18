# @jameslnewell/jest-preset-node

A [Jest](https://jestjs.io/) preset according to my preferences.

## Installation

```
npm install --dev jest @types/jest @jameslnewell/jest-preset-node
```

## Usage

Add the following configuration to your `package.json`:

```json
{
  "jest": {
    "preset": "@jameslnewell/jest-preset-node"
  },
  "scripts": {
    "test": "jest --selectProjects unit --passWithNoTests",
    "test:e2e": "jest --selectProjects e2e --passWithNoTests"
  }
}
```

> Create a `.swcrc` file via `@jameslnewell/swc-config` to configure transpilation.
