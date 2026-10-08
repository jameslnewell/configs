import {defineConfig} from 'eslint/config';
import eslint from '@eslint/js';
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
      // separate type imports are expected with `verbatimModuleSyntax`
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
