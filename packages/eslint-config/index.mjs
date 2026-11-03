import {defineConfig} from 'eslint/config';
import eslint from '@eslint/js';
import packageJson from './package.json' with {type: 'json'};
import preferOptionsObject from './rules/prefer-options-object.mjs';
import prettierConfig from 'eslint-config-prettier/flat';
import tseslint from 'typescript-eslint';
import vitest from '@vitest/eslint-plugin';

const plugin = {
  // the version lets ESLint's cache tell when the rules change
  meta: {name: packageJson.name, version: packageJson.version},
  rules: {'prefer-options-object': preferOptionsObject},
};
// typed as loosely as typescript-eslint types its own plugin, because its rule type doesn't match ESLint's
/** @type {{meta: {name: string}}} */
const compatiblePlugin = plugin;

export default defineConfig([
  {
    name: '@jameslnewell: all files',
    files: ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'],
    plugins: {'@jameslnewell': compatiblePlugin},
    rules: {
      '@jameslnewell/prefer-options-object': ['error'],
    },
  },
  {
    name: '@jameslnewell: javascript files',
    files: ['**/*.{js,cjs,mjs,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    extends: [eslint.configs.recommended],
    rules: {
      'sort-imports': ['error'],
      'no-duplicate-imports': ['error'],
    },
  },
  {
    name: '@jameslnewell: typescript files',
    files: ['**/*.{ts,cts,mts,tsx}'],
    extends: [eslint.configs.recommended, tseslint.configs.strictTypeChecked],
    languageOptions: {
      parserOptions: {
        // type information comes from the tsconfig.json nearest to each file
        projectService: true,
      },
    },
    rules: {
      'sort-imports': ['error'],
      // allow `import type {A} from 'a'` alongside `import {b} from 'a'`, a common style with `verbatimModuleSyntax`
      'no-duplicate-imports': ['error', {allowSeparateTypeImports: true}],

      // infer return types where it makes sense
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],
      // prefer interfaces for declaration merging
      '@typescript-eslint/no-empty-interface': ['off'],
      // prefer declarative types
      '@typescript-eslint/no-inferrable-types': ['off'],
    },
  },
  {
    name: '@jameslnewell: test files',
    files: ['**/*.test.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'],
    extends: [vitest.configs.recommended],
    rules: {
      // a skipped test quietly stops checking anything, so fail rather than warn
      'vitest/no-disabled-tests': ['error'],
    },
  },
  {
    name: '@jameslnewell: typescript test files',
    files: ['**/*.test.{ts,cts,mts,tsx}'],
    settings: {
      // TypeScript files have type information, so let the vitest rules use it e.g. to allow `describe(myFunction, ...)`
      vitest: {
        typecheck: true,
      },
    },
  },
  prettierConfig,
]);
