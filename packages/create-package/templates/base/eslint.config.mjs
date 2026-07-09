import config from '@jameslnewell/eslint-config/node';

export default [
  ...config,
  {
    files: ['src/**/*.{ts,cts,mts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
