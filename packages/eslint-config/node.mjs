import {defineConfig} from 'eslint/config';
import globals from 'globals';
// eslint-disable-next-line sort-imports
import base from './index.mjs';

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
