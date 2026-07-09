# @jameslnewell/vitest-config

Shared [Vitest](https://vitest.dev) configuration.

Mirrors the `@jameslnewell/jest-preset` conventions: a Node environment and
`src/**` + `test/**` test globs, with `v8` coverage.

## Install

```sh
pnpm add -D @jameslnewell/vitest-config vitest
```

## Usage

Vitest has no "preset" mechanism, so merge the shared config with your own
overrides using `mergeConfig`:

```ts
// vitest.config.ts
import {defineConfig, mergeConfig} from 'vitest/config';
import shared from '@jameslnewell/vitest-config';

export default mergeConfig(
  shared,
  defineConfig({
    // per-project overrides
  }),
);
```

Or use it as-is:

```ts
// vitest.config.ts
export {default} from '@jameslnewell/vitest-config';
```

## Coverage

Coverage uses the `v8` provider. If you run `vitest --coverage`, also install
the provider:

```sh
pnpm add -D @vitest/coverage-v8
```
