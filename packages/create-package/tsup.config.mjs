import {cli} from '@jameslnewell/tsup-config';

// The generator ships `templates/` from the package root (see package.json
// `files`); only `src/` is bundled to `dist/`.
export default cli({entry: ['src/cli.ts']});
