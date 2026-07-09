# @jameslnewell/tsup-config

Shared [tsup](https://tsup.egoist.dev) build presets.

Centralises the build settings that must stay in lock-step with each package's
`exports` — notably the ESM `.js` / CJS `.cjs` extension pairing.

## Install

```sh
pnpm add -D @jameslnewell/tsup-config tsup
```

## Usage

### Library — ESM-first, dual ESM + CJS + types

```ts
// tsup.config.ts
import {lib} from '@jameslnewell/tsup-config';

export default lib({entry: ['src/index.ts']});
```

With `"type": "module"` in the package, this emits `dist/index.js` (ESM),
`dist/index.cjs` (CJS) and `dist/index.d.ts` — matching an `exports` map of:

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  }
}
```

### CLI — ESM-only with a shebang

```ts
// tsup.config.ts
import {cli} from '@jameslnewell/tsup-config';

export default cli({entry: ['src/cli.ts']});
```

Emits `dist/cli.js` (ESM) with a `#!/usr/bin/env node` banner, ready for a
package `"bin"`.

## Presets

| Preset  | Format        | `dts` | Extras         |
| ------- | ------------- | ----- | -------------- |
| `lib()` | `esm` + `cjs` | yes   | —              |
| `cli()` | `esm`         | no    | shebang banner |

Both accept a [tsup `Options`](https://tsup.egoist.dev) object that is merged
over the preset.
