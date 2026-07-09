# @jameslnewell/create-package

Scaffold a new `@jameslnewell`-style npm package — a **library** or a **CLI** —
pre-wired with ESLint, Prettier, TypeScript, Vitest, tsup, changesets and
GitHub Actions.

## Usage

```sh
# npm (forwards flags after `--`)
npm create @jameslnewell/package -- --variant lib my-lib

# pnpm (no `--` separator needed)
pnpm create @jameslnewell/package --variant cli my-cli
```

### Arguments & options

| Argument / option      | Required | Default                | Description             |
| ---------------------- | -------- | ---------------------- | ----------------------- |
| `<directory>`          | yes      | —                      | Directory to create.    |
| `--variant <lib\|cli>` | yes      | —                      | Package variant.        |
| `--name <name>`        | no       | the directory basename | Published package name. |
| `--description <text>` | no       | empty                  | Package description.    |
| `-h`, `--help`         | no       | —                      | Show usage.             |

There are **no interactive prompts** — a missing or invalid required argument
prints usage to stderr and exits non-zero.

### Variants

- **`lib`** — a published library. ESM-first; builds **ESM + CJS + `.d.ts`**
  with an `exports` map.
- **`cli`** — a published CLI. **ESM-only**, with a `bin` and a `#!/usr/bin/env node`
  shebang.

### What you get

- `.editorconfig`, `.npmrc` (Node 24 via `use-node-version`), `.gitignore`
- ESLint (flat config) — `@jameslnewell/eslint-config`
- Prettier — `@jameslnewell/prettier-config`
- Strict TypeScript — `@jameslnewell/typescript-config`
- Vitest — `@jameslnewell/vitest-config`
- tsup build — `@jameslnewell/tsup-config`
- changesets + GitHub Actions **CI** and **release** workflows

The generated project is opinionated toward **pnpm 11** and **Node 24**.

## License

MIT
