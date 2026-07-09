import {defineConfig} from 'tsup';

const common = {
  target: 'node24',
  clean: true,
  sourcemap: true,
};

/**
 * Library preset: ESM-first, dual ESM + CJS output with type declarations.
 *
 * ```ts
 * // tsup.config.ts
 * import {lib} from '@jameslnewell/tsup-config';
 * export default lib({entry: ['src/index.ts']});
 * ```
 *
 * Emits `dist/<name>.js` (ESM), `dist/<name>.cjs` (CJS) and `dist/<name>.d.ts`
 * when the consuming package sets `"type": "module"`.
 *
 * @param {import('tsup').Options} [options] Overrides merged over the preset.
 */
export const lib = (options = {}) =>
  defineConfig({
    ...common,
    format: ['esm', 'cjs'],
    dts: true,
    ...options,
  });

/**
 * CLI preset: ESM-only output with a Node shebang banner.
 *
 * ```ts
 * // tsup.config.ts
 * import {cli} from '@jameslnewell/tsup-config';
 * export default cli({entry: ['src/cli.ts']});
 * ```
 *
 * @param {import('tsup').Options} [options] Overrides merged over the preset.
 */
export const cli = (options = {}) =>
  defineConfig({
    ...common,
    format: ['esm'],
    dts: false,
    banner: {js: '#!/usr/bin/env node'},
    ...options,
  });
