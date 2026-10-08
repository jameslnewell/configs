# @jameslnewell/vitest-config

A [`vitest`](https://vitest.dev/) config according to my preferences.

Tests are split into two projects:

- `unit` — `src/**/*.test.ts`
- `e2e` — `test/**/*.test.ts`

## Installation

```bash
npm i -D vitest vite @jameslnewell/vitest-config
```

## Usage

Create `vitest.config.mjs`:

```js
export {default} from '@jameslnewell/vitest-config';
```

Or extend it:

```js
import config from '@jameslnewell/vitest-config';
import {defineConfig, mergeConfig} from 'vitest/config';

export default mergeConfig(
  config,
  defineConfig({
    test: {
      testTimeout: 10_000,
    },
  }),
);
```

Update `package.json`:

```json
{
  "scripts": {
    "test": "vitest run --project unit",
    "test:e2e": "vitest run --project e2e"
  }
}
```

TypeScript is transpiled by Vite, so no `swc` or `babel` config is needed.
