
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint', 
    'prettier'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  rules: {
    "no-var": "error"
  }
};