import {defineConfig} from 'eslint/config';
import eslint from '@eslint/js';
import n from 'eslint-plugin-n';
import prettierConfig from 'eslint-config-prettier/flat';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';
import vitest from '@vitest/eslint-plugin';

export default defineConfig([
  {
    name: '@jameslnewell: plugins',
    files: ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'],
    plugins: {
      node: n,
      '@stylistic': stylistic,
    },
    rules: {
      // a blank line between the imports and the code
      '@stylistic/padding-line-between-statements': [
        'error',
        {blankLine: 'always', prev: 'import', next: '*'},
        {blankLine: 'any', prev: 'import', next: 'import'},
      ],
      'node/prefer-node-protocol': ['error'],
      // allow `/// <reference />` directives and `//#region` markers
      '@stylistic/spaced-comment': [
        'error',
        'always',
        {markers: ['/', '#region', '#endregion']},
      ],
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
      'no-var': ['error'],
      'prefer-const': ['error'],
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

      // split `import {a, type B}` into `import {a}` and `import type {B}` (allowed by `no-duplicate-imports` above)
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {prefer: 'type-imports', fixStyle: 'separate-type-imports'},
      ],
      '@typescript-eslint/method-signature-style': ['error', 'method'],
      'no-shadow': ['off'],
      '@typescript-eslint/no-shadow': ['error'],

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
