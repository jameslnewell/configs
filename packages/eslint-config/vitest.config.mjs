import {defineConfig} from 'vitest/config';

// @jameslnewell/vitest-config isn't used here because it depends on this package for linting
export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
  },
});
