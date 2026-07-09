import {type JsonObject, mergePackageJson} from './package-json.js';
import {
  RENAMES,
  type Tokens,
  applyTokens,
  isTextFile,
  toBinName,
} from './tokens.js';
import {basename, dirname, join, resolve} from 'node:path';
import {
  cp,
  mkdir,
  readFile,
  readdir,
  rename,
  writeFile,
} from 'node:fs/promises';
import type {Variant} from './variants.js';
import {fileURLToPath} from 'node:url';

// `templates/` sits beside this file's directory in both the source tree
// (`src/`) and the built output (`dist/`), so `../templates` resolves in tests
// and when installed.
const templatesDir = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  'templates',
);

export interface CreateOptions {
  variant: Variant;
  name: string;
  directory: string;
  description?: string | undefined;
}

const isFragment = (source: string): boolean =>
  /package\.[a-z]+\.json$/.test(basename(source));

async function isEmptyOrMissing(dir: string): Promise<boolean> {
  try {
    const entries = await readdir(dir);
    return entries.length === 0;
  } catch {
    return true;
  }
}

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, {withFileTypes: true});
  const files: string[] = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function readJson(file: string): Promise<JsonObject> {
  return JSON.parse(await readFile(file, 'utf8')) as JsonObject;
}

async function writePackageJson(
  target: string,
  variant: Variant,
  tokens: Tokens,
): Promise<void> {
  const base = await readJson(join(templatesDir, 'base', 'package.base.json'));
  const overlay = await readJson(
    join(templatesDir, variant, `package.${variant}.json`),
  );
  const merged = mergePackageJson(base, overlay);
  const json = applyTokens(`${JSON.stringify(merged, null, 2)}\n`, tokens);
  await writeFile(join(target, 'package.json'), json);
}

export async function create(options: CreateOptions): Promise<void> {
  const {variant, name} = options;
  const target = resolve(options.directory);

  if (!(await isEmptyOrMissing(target))) {
    throw new Error(`Target directory is not empty: ${target}`);
  }

  const tokens: Tokens = {
    name,
    binName: toBinName(name),
    description: options.description ?? '',
    year: String(new Date().getFullYear()),
  };

  await mkdir(target, {recursive: true});
  await cp(join(templatesDir, 'base'), target, {
    recursive: true,
    filter: (source) => !isFragment(source),
  });
  await cp(join(templatesDir, variant), target, {
    recursive: true,
    force: true,
    filter: (source) => !isFragment(source),
  });

  for (const file of await walk(target)) {
    let path = file;
    const renameTo = RENAMES[basename(path)];
    if (renameTo !== undefined) {
      const renamed = join(dirname(path), renameTo);
      await rename(path, renamed);
      path = renamed;
    }
    if (isTextFile(path)) {
      const content = await readFile(path, 'utf8');
      await writeFile(path, applyTokens(content, tokens));
    }
  }

  await writePackageJson(target, variant, tokens);
}
