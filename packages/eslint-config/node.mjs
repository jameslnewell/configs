// eslint-disable-next-line import/no-unresolved
import {defineConfig} from 'eslint/config';
// eslint-disable-next-line sort-imports
import base from './index.mjs';
import globals from 'globals';

export default defineConfig([
  ...base,
  {
    name: '@jameslnewell: node environment',
    files: ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
]);
