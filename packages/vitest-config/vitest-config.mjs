import {defineConfig} from 'vitest/config';

/**
 * Shared Vitest configuration.
 *
 * Mirrors the `@jameslnewell/jest-preset` conventions: a Node environment and
 * `src/**` + `test/**` test globs. Consumers merge it with their own overrides
 * using Vitest's `mergeConfig`:
 *
 * ```ts
 * import {defineConfig, mergeConfig} from 'vitest/config';
 * import shared from '@jameslnewell/vitest-config';
 *
 * export default mergeConfig(shared, defineConfig({}));
 * ```
 *
 * Coverage uses the `v8` provider; install `@vitest/coverage-v8` if you run
 * `vitest --coverage`.
 */
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'test/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts'],
    },
  },
});
