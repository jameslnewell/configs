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
    "test": "jest --selectProjects unit",
    "test:e2e": "jest --selectProjects e2e"
  }
}
```

> Configure a `.swcrc` to start transpiling code.
