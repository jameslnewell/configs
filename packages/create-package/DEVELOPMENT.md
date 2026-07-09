# Development

How `@jameslnewell/create-package` is built and how to extend it.

## Layout

```
src/
  cli.ts          # bin entry (shebang added by tsup); calls run()
  run.ts          # arg parsing + validation (no prompts) -> exit code
  create.ts       # orchestrator: copy, overlay, merge, tokenise, rename
  variants.ts     # VARIANTS = ['lib','cli']
  package-json.ts # deep-merge of base + variant package.json fragments
  tokens.ts       # {{name}}/{{binName}}/{{description}}/{{year}} + rename map
  usage.ts        # help text
  *.test.ts       # vitest unit tests
templates/
  base/           # shared by every variant
  lib/            # overlay for --variant lib
  cli/            # overlay for --variant cli
```

## The generator pipeline (`create.ts`)

1. Resolve `templates/` relative to the built file — it sits beside both `src/`
   and `dist/`, so `../templates` works in tests and when installed.
2. Refuse a non-empty target directory.
3. `fs.cp(templates/base)` then `fs.cp(templates/<variant>)` (variant wins);
   `package.*.json` fragments are skipped by a copy `filter`.
4. Walk the output: rename `_gitignore`→`.gitignore`, `_npmrc`→`.npmrc`
   (npm strips those two names from published tarballs), then replace tokens in
   text files.
5. Deep-merge `package.base.json` + `package.<variant>.json`, tokenise, and
   write `package.json`.

## Templates

- Store any file npm would strip under an underscore and add it to the `RENAMES`
  map in `tokens.ts` (currently `_gitignore`, `_npmrc`).
- Tokens: `{{name}}`, `{{binName}}` (unscoped), `{{description}}`, `{{year}}`.
- `package.base.json` holds everything shared; each variant's
  `package.<variant>.json` expresses only its delta (merged deep; arrays are
  unioned; scalars/objects are overridden per key).
- `templates/` is excluded from this package's own lint/type/test scope but is
  Prettier-formatted, so keep template sources valid.

## Adding a variant

1. Add it to `VARIANTS` in `src/variants.ts`.
2. Create `templates/<variant>/` with a `package.<variant>.json` fragment and a
   `tsup.config.mjs` (use the matching `@jameslnewell/tsup-config` preset).
3. Extend the tests in `src/create.test.ts`.

## Local loop

```sh
pnpm build                    # bundle to dist/ with tsup (adds the shebang)
pnpm test                     # vitest unit tests
node dist/cli.js --variant lib /tmp/scratch-lib   # run the built CLI
```

## Verifying the published shape

Unit tests read from the source `templates/`, so they can't catch packaging
mistakes. Before publishing, confirm the tarball ships both `dist/` and
`templates/`:

```sh
pnpm pack --dry-run    # expect dist/** and templates/** in the file list
```

A full end-to-end (installing a scaffolded project) needs the `@jameslnewell/*`
config packages published — do it against a local registry (e.g. verdaccio).

## Releasing

Versioned independently of the config packages via changesets (`pnpm changeset`).
