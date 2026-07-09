# {{name}}

{{description}}

## Install

```sh
pnpm add {{name}}
```

## Development

```sh
pnpm install
pnpm build            # bundle with tsup
pnpm test             # run vitest
pnpm typing:check     # tsc --noEmit
pnpm linting:check    # eslint
pnpm formatting:check # prettier
```

## Releasing

Changesets drives versioning and publishing:

```sh
pnpm changeset        # record a change
```

Merging to `main` opens/updates a release PR; merging that publishes to npm.

## License

MIT © {{year}}
