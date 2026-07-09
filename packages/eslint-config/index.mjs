import {defineConfig} from 'eslint/config';
import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import-x';
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
      'import-x/resolver': {
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
    },
    settings: {
      'import-x/resolver': {
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
    name: '@jameslnewell: source typescript files',
    files: ['src/**/*.{ts,cts,mts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    name: '@jameslnewell: test files',
    files: ['**/*.test.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'],
    extends: [vitest.configs.recommended],
  },
  prettierConfig,
]);
