# @jameslnewell/eslint-config

A [`eslint`](https://eslint.org/) config according to my preferences.

## Installation

```
npm install --dev eslint @jameslnewell/eslint-config
```

## Usage

Create `eslint.config.mjs`:

```js
export config from '@jameslnewell/eslint-config';

export default config;
```

Update `package.json`:

```json
{
  "scripts": {
    "lint": "eslint ."
  }
}
```

## configs

- `@jameslnewell/eslint-config`
- `@jameslnewell/eslint-config/node`
