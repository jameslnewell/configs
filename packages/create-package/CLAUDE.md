# CLAUDE.md

The agent guide for this package lives in **[AGENTS.md](./AGENTS.md)** — read it
first.

@AGENTS.md

## Claude-specific notes

- This package is part of the `@jameslnewell/configs` monorepo (pnpm 11, Node 24).
  Run scripts with `pnpm --filter @jameslnewell/create-package <script>`.
- Prefer editing `templates/` and the small `src/` modules over reaching for new
  dependencies — the generator is intentionally dependency-free.
