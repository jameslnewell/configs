import {afterEach, beforeEach, describe, expect, it} from 'vitest';
import {mkdtemp, readFile, readdir, rm} from 'node:fs/promises';
import {VARIANTS} from './variants.js';
import {create} from './create.js';
import {existsSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';

interface PackageJson {
  name?: string;
  description?: string;
  type?: string;
  main?: string;
  module?: string;
  types?: string;
  bin?: unknown;
  private?: boolean;
  scripts?: Record<string, string>;
  exports?: {'.'?: {import?: string; require?: string; types?: string}};
}

async function collectFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, {withFileTypes: true});
  const files: string[] = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(full)));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function readPackageJson(target: string): Promise<PackageJson> {
  return JSON.parse(
    await readFile(join(target, 'package.json'), 'utf8'),
  ) as PackageJson;
}

describe('create', () => {
  let dir: string;

  beforeEach(async () => {
    dir = await mkdtemp(join(tmpdir(), 'create-package-'));
  });

  afterEach(async () => {
    await rm(dir, {recursive: true, force: true});
  });

  describe.each(VARIANTS)('%s variant', (variant) => {
    it('leaves no unreplaced token markers', async () => {
      const target = join(dir, 'pkg');
      await create({
        variant,
        name: '@scope/pkg',
        directory: target,
        description: 'A test package.',
      });

      // Our tokens are `{{name}}` etc. — distinct from GitHub Actions' `${{ … }}`.
      const tokenMarker = /\{\{(?:name|binName|description|year)\}\}/;
      const offenders: string[] = [];
      for (const file of await collectFiles(target)) {
        const content = await readFile(file, 'utf8');
        if (tokenMarker.test(content)) {
          offenders.push(file);
        }
      }
      expect(offenders).toEqual([]);
    });

    it('renames _gitignore to .gitignore', async () => {
      const target = join(dir, 'pkg');
      await create({variant, name: 'pkg', directory: target});

      expect(existsSync(join(target, '.gitignore'))).toBe(true);
      expect(existsSync(join(target, '_gitignore'))).toBe(false);
    });

    it('ships changesets and CI + release workflows', async () => {
      const target = join(dir, 'pkg');
      await create({variant, name: 'pkg', directory: target});

      expect(existsSync(join(target, '.changeset', 'config.json'))).toBe(true);
      expect(existsSync(join(target, '.github', 'workflows', 'ci.yml'))).toBe(
        true,
      );
      expect(
        existsSync(join(target, '.github', 'workflows', 'release.yml')),
      ).toBe(true);
    });

    it('merges the package.json fragments and applies tokens', async () => {
      const target = join(dir, 'pkg');
      await create({
        variant,
        name: '@scope/thing',
        directory: target,
        description: 'Does things.',
      });

      const pkg = await readPackageJson(target);
      expect(pkg.name).toBe('@scope/thing');
      expect(pkg.description).toBe('Does things.');
      expect(pkg.type).toBe('module');
      expect(pkg.scripts?.['build']).toBe('tsup');
      expect(pkg.scripts?.['test']).toBe('vitest run');
    });
  });

  it('lib exposes dual ESM + CJS exports', async () => {
    const target = join(dir, 'lib');
    await create({variant: 'lib', name: 'lib', directory: target});

    const pkg = await readPackageJson(target);
    expect(pkg.exports?.['.']?.import).toBe('./dist/index.js');
    expect(pkg.exports?.['.']?.require).toBe('./dist/index.cjs');
    expect(pkg.main).toBe('./dist/index.cjs');
    expect(pkg.bin).toBeUndefined();
  });

  it('cli exposes a bin and is ESM-only (no cjs export)', async () => {
    const target = join(dir, 'cli');
    await create({variant: 'cli', name: 'my-cli', directory: target});

    const pkg = await readPackageJson(target);
    expect(pkg.bin).toBeDefined();
    expect(pkg.exports?.['.']?.require).toBeUndefined();
  });

  it('rejects a non-empty target directory', async () => {
    const target = join(dir, 'pkg');
    await create({variant: 'lib', name: 'pkg', directory: target});

    await expect(
      create({variant: 'lib', name: 'pkg', directory: target}),
    ).rejects.toThrow(/not empty/);
  });
});
