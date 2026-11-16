import {defineConfig} from 'eslint/config';
import eslint from '@eslint/js';
import importX from 'eslint-plugin-import-x';
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
      // registered as `import` (not `import-x`) so rule names match `eslint-plugin-import`. No resolver settings
      // are configured on purpose: `tsc` resolves imports, so these are only the syntactic rules.
      import: importX,
      node: n,
      '@stylistic': stylistic,
    },
    rules: {
      'import/first': ['error'],
      'import/newline-after-import': ['error'],
      'import/order': ['error'],
      'node/prefer-node-protocol': ['error'],
      '@stylistic/spaced-comment': ['error'],
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
    name: '@jameslnewell: es module files',
    files: ['**/*.{js,mjs,jsx,ts,mts,tsx}'],
    rules: {
      'import/no-commonjs': ['error'],
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

      // `eslint-plugin-import-x` has no `prefer-top-level-if-only-type-imports`, so `import {a, type B}` is split into
      // `import {a}` and `import type {B}` (allowed by `no-duplicate-imports` above)
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
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
