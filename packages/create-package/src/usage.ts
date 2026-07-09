import {VARIANTS} from './variants.js';

export const usage = `Usage: npm create @jameslnewell/package -- --variant <${VARIANTS.join('|')}> <directory>

Scaffold a new @jameslnewell-style npm package.

Arguments:
  <directory>            Directory to create the package in (required).

Options:
  --variant <${VARIANTS.join('|')}>      Package variant (required).
  --name <name>          Package name (default: the directory's basename).
  --description <text>   Package description.
  -h, --help             Show this help.

Examples:
  npm create @jameslnewell/package -- --variant lib my-lib
  pnpm create @jameslnewell/package --variant cli my-cli
`;
