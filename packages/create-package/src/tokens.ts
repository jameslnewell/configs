import {basename, extname} from 'node:path';

export interface Tokens {
  name: string;
  /** The unscoped name, usable as a `bin` key (no `/`). */
  binName: string;
  description: string;
  year: string;
}

const TEXT_EXTENSIONS = new Set([
  '.ts',
  '.mts',
  '.cts',
  '.tsx',
  '.js',
  '.mjs',
  '.cjs',
  '.jsx',
  '.json',
  '.md',
  '.yml',
  '.yaml',
]);

// Text files that have no "normal" extension (dotfiles / rename sources).
const TEXT_FILENAMES = new Set([
  '_gitignore',
  '.gitignore',
  '_npmrc',
  '.npmrc',
  '.editorconfig',
  '.nvmrc',
]);

/**
 * npm strips `.gitignore` and `.npmrc` from published tarballs, so templates
 * store them under an underscore and the generator renames them on write.
 */
export const RENAMES: Record<string, string> = {
  _gitignore: '.gitignore',
  _npmrc: '.npmrc',
};

export function isTextFile(filePath: string): boolean {
  const name = basename(filePath);
  return TEXT_FILENAMES.has(name) || TEXT_EXTENSIONS.has(extname(name));
}

export function applyTokens(content: string, tokens: Tokens): string {
  return content
    .replaceAll('{{name}}', tokens.name)
    .replaceAll('{{binName}}', tokens.binName)
    .replaceAll('{{description}}', tokens.description)
    .replaceAll('{{year}}', tokens.year);
}

/** Derive an unscoped `bin` key from a (possibly scoped) package name. */
export function toBinName(name: string): string {
  const slash = name.lastIndexOf('/');
  return slash === -1 ? name : name.slice(slash + 1);
}
