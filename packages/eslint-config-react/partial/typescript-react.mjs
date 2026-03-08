import react from './react.mjs';
import typescript from './typescript.mjs';

export default {
  ...typescript,
  ...react,
  parserOptions: {
    ...typescript.parserOptions,
    ...react.parserOptions,
    ecmaFeatures: {
      ...typescript.parserOptions.ecmaFeatures,
      ...react.parserOptions.ecmaFeatures,
    },
  },
  plugins: [...typescript.plugins, ...react.plugins],
  settings: {
    ...react.settings,
  },
  extends: [...typescript.extends, ...react.extends],
  rules: {
    ...typescript.rules,
    ...react.rules,
    // we've got types so we don't need prop-types
    'react/prop-types': 'off',
  },
};
