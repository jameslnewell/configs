import {defineConfig} from 'eslint/config';
import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettierConfig from 'eslint-config-prettier/flat';
import tseslint from 'typescript-eslint';
import vitest from '@vitest/eslint-plugin';

export default defineConfig([
  {
    name: '@jameslnewell: javascript files',
    files: ['**/*.{js,cjs,mjs,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    extends: [eslint.configs.recommended, importPlugin.flatConfigs.recommended],
    rules: {
      'sort-imports': ['error'],
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: {
          extensions: ['.js', '.cjs', '.mjs', '.jsx'],
        },
      },
    },
  },
  {
    name: '@jameslnewell: typescript files',
    files: ['**/*.{ts,cts,mts,tsx}'],
    extends: [
      eslint.configs.recommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      tseslint.configs.strictTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        // type information comes from the tsconfig.json nearest to each file
        projectService: true,
      },
    },
    rules: {
      'sort-imports': ['error'],

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

      // TypeScript already checks these, and its resolution understands the tsconfig (e.g. `customConditions`) where eslint-import-resolver-typescript doesn't
      // https://typescript-eslint.io/troubleshooting/typed-linting/performance#eslint-plugin-import
      'import/named': ['off'],
      'import/namespace': ['off'],
      'import/default': ['off'],
      'import/no-named-as-default-member': ['off'],
      'import/no-unresolved': ['off'],
    },
    settings: {
      'import/resolver': {
        typescript: {
          extensions: ['.ts', '.cts', '.mts', '.tsx'],
        },
        node: {
          extensions: ['.js', '.cjs', '.mjs', '.jsx'],
        },
      },
    },
  },
  {
    name: '@jameslnewell: test files',
    files: ['**/*.test.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'],
    extends: [vitest.configs.recommended],
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
