import config from '@jameslnewell/eslint-config/node';

export default [
  {
    // Templates are rendered source, not part of this package's own lint scope.
    ignores: ['templates/**', 'dist/**'],
  },
  ...config,
  {
    // Point typed linting at this package's tsconfig.
    files: ['src/**/*.{ts,cts,mts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
