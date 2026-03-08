# @jameslnewell/configs

Sharable configs for managing my personal repositories.

## Installation

```
pnpm i
```

## Releasing

This repository uses [auto](https://intuit.github.io/auto/) for automated releases.

### How it works

1. Create a PR with your changes
2. Add a label to indicate the release type:
   - `major` - Breaking changes (bumps major version)
   - `minor` - New features (bumps minor version)
   - `patch` - Bug fixes (bumps patch version)
   - `skip-release` - No release needed
   - `internal` - Internal changes (no version bump)
   - `documentation` - Documentation changes (no version bump)
3. Merge the PR to `master`
4. Auto will automatically:
   - Update the changelog
   - Bump versions
   - Create a GitHub release
   - Publish to npm

### Setup (required once)

Add these secrets to your GitHub repository:

- `NPM_TOKEN` - npm access token with publish permissions

### Local commands

```bash
# Preview what version would be released
pnpm exec auto version

# Preview the changelog
pnpm exec auto changelog --dry-run

# Create labels on GitHub (run once)
pnpm exec auto create-labels
```
