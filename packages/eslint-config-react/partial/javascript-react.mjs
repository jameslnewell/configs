import javascript from './javascript.mjs';
import react from './react.mjs';

export default {
  ...javascript,
  parserOptions: {
    ...javascript.parserOptions,
    ...react.parserOptions,
    ecmaFeatures: {
      ...javascript.parserOptions.ecmaFeatures,
      ...react.parserOptions.ecmaFeatures,
    },
  },
  plugins: [...javascript.plugins, ...react.plugins],
  settings: {
    ...react.settings,
  },
  extends: [...javascript.extends, ...react.extends],
  rules: {
    ...javascript.rules,
    ...react.rules,
  },
};
