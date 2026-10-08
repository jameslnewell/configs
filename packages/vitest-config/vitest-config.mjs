import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    passWithNoTests: true,
    restoreMocks: true,
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['src/**/*.test.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          include: ['test/**/*.test.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
        },
      },
    ],
  },
});
