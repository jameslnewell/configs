const {configs} = require('@typescript-eslint/eslint-plugin');

module.exports = {
  env: {
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
    ecmaFeatures: {},
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    // 'plugin:import/errors',
    // 'plugin:import/warnings',
    // 'plugin:import/typescript',
  ],
  rules: {
    // manually apply "plugin:@typescript-eslint/eslint-recommended" since overrides inside overrides are
    // causing some kind of diff error
    ...configs['eslint-recommended'].overrides[0].rules,

    // note you must disable the base rule as it can report incorrect errors
    // @see https://github.com/bradzacher/eslint-plugin-typescript/blob/master/docs/rules/no-unused-vars.md#options
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {argsIgnorePattern: '^_unused_'},
    ],

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
  // settings: {
  //   'import/resolver': {
  //     [require.resolve('eslint-import-resolver-typescript')]: {},
  //   },
  // },
};
