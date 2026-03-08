import javascriptReact from './partial/javascript-react.mjs';
import typescript from './partial/typescript.mjs';
import typescriptReact from './partial/typescript-react.mjs';

export default {
  overrides: [
    {
      ...javascriptReact,
      files: ['*.js', '*.jsx'],
    },
    {
      ...javascriptReact,
      files: ['*.test.js', '*.test.jsx'],
      env: {
        jest: true,
      },
    },
    {
      ...typescript,
      files: ['*.ts'],
    },
    {
      ...typescript,
      files: ['*.test.ts'],
      env: {
        jest: true,
      },
    },
    {
      ...typescriptReact,
      files: ['*.tsx'],
    },
    {
      ...typescriptReact,
      files: ['*.test.tsx'],
      env: {
        jest: true,
      },
    },
  ],
};
