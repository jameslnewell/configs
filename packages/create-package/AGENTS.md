# Agent guide — @jameslnewell/create-package

Orientation for coding agents working on this package. Tool-agnostic; Claude
Code reads it via `CLAUDE.md`.

## What this is

A `npm create` / `pnpm create` initializer that scaffolds a new npm package
(variant `lib` or `cli`) from `templates/`. It has **zero runtime dependencies**
— only Node built-ins (`node:fs`, `node:path`, `node:util`, `node:url`).

## Architecture

- `src/cli.ts` → `src/run.ts` (parse args, no prompts, return an exit code) →
  `src/create.ts` (do the scaffolding).
- `create.ts` copies `templates/base` then overlays `templates/<variant>`,
  deep-merges the `package.*.json` fragments, replaces `{{tokens}}`, and renames
  underscore dotfiles.
- Built with tsup (ESM + shebang) to `dist/cli.js`, which is the `bin`.

## Conventions to preserve

- **Keep zero runtime deps.** Reach for Node built-ins.
- Templates ship from the package root: `package.json#files` must list both
  `dist` and `templates`.
- Resolve templates with `../templates` relative to `import.meta.url` — never an
  absolute or cwd-based path (it must work from `src/` in tests and `dist/` when
  installed).
- npm strips `.gitignore` and `.npmrc` from tarballs — store them as `_gitignore`
  / `_npmrc` and extend the `RENAMES` map in `src/tokens.ts`.
- Tokens are `{{name}}`, `{{binName}}`, `{{description}}`, `{{year}}`.
- `lib` is ESM-first + dual (ESM/CJS/dts); `cli` is ESM-only. Keep each variant's
  `exports`/`bin` in step with its `@jameslnewell/tsup-config` preset.
- The scaffolded project targets **pnpm 11 / Node 24**.

## Adding a variant

Add to `VARIANTS` (`src/variants.ts`), create `templates/<variant>/` (a
`package.<variant>.json` fragment + `tsup.config.mjs`), and cover it in
`src/create.test.ts` (which runs over every `VARIANTS` entry).

## Before you finish — verify

```sh
pnpm --filter @jameslnewell/create-package build
pnpm --filter @jameslnewell/create-package test          # vitest
pnpm --filter @jameslnewell/create-package typing:check
pnpm --filter @jameslnewell/create-package linting:check
pnpm --filter @jameslnewell/create-package formatting:check
pnpm --filter @jameslnewell/create-package pack --dry-run # dist/ AND templates/ present
```

A good catch-all: the tests assert **no `{{` token markers remain** in any
generated file.
