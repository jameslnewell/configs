import {describe, expect, it} from 'vitest';
import {ESLint} from 'eslint';
import {resolve} from 'node:path';

const fixturesDirectory = resolve(import.meta.dirname, '__fixtures__');

async function lint(fixture: string): Promise<string[]> {
  const eslint = new ESLint({
    cwd: fixturesDirectory,
    overrideConfigFile: resolve(import.meta.dirname, '../node.mjs'),
  });
  const results = await eslint.lintFiles([resolve(fixturesDirectory, fixture)]);
  return results.flatMap((result) =>
    result.messages.map((message) => message.ruleId ?? message.message),
  );
}

describe('ESLint fixtures', () => {
  it('should pass on sample.js', async () => {
    expect(await lint('sample.js')).toEqual([]);
  });

  it('should fail on sample.ts', async () => {
    expect(await lint('sample.ts')).toEqual(
      expect.arrayContaining([
        '@typescript-eslint/no-unused-vars',
        '@typescript-eslint/no-floating-promises',
      ]),
    );
  });

  it('should pass on sample.test.ts', async () => {
    expect(await lint('sample.test.ts')).toEqual([]);
  });

  it('should leave resolving imports in TypeScript files to tsc', async () => {
    expect(await lint('custom-conditions/index.ts')).toEqual([]);
  });

  it('should fail on duplicate imports in JavaScript files', async () => {
    expect(await lint('duplicate-imports.js')).toEqual([
      'no-duplicate-imports',
    ]);
  });

  it('should fail on duplicate imports in TypeScript files', async () => {
    expect(await lint('duplicate-imports.ts')).toEqual([
      'no-duplicate-imports',
    ]);
  });

  it('should pass on separate type and value imports in TypeScript files', async () => {
    expect(await lint('type-and-value-imports.ts')).toEqual([]);
  });

  it('should fail on `var` in JavaScript files', async () => {
    expect(await lint('var-and-let.js')).toEqual(['no-var', 'prefer-const']);
  });

  it('should fail on code directly after imports', async () => {
    expect(await lint('newline-after-import.js')).toEqual([
      '@stylistic/padding-line-between-statements',
    ]);
  });

  it('should fail on Node.js builtin imports without the `node:` protocol', async () => {
    expect(await lint('node-protocol.js')).toEqual([
      'node/prefer-node-protocol',
    ]);
  });

  it('should fail on comments without a leading space', async () => {
    expect(await lint('spaced-comment.js')).toEqual([
      '@stylistic/spaced-comment',
    ]);
  });

  it('should allow triple-slash directives and region markers', async () => {
    expect(await lint('directives.ts')).toEqual([]);
  });

  it('should fail on type-only imports without `import type` in TypeScript files', async () => {
    expect(await lint('type-import.ts')).toEqual([
      '@typescript-eslint/consistent-type-imports',
    ]);
  });

  it('should fail on property-style method signatures', async () => {
    expect(await lint('method-signature.ts')).toEqual([
      '@typescript-eslint/method-signature-style',
    ]);
  });

  it('should fail on shadowed variables in TypeScript files', async () => {
    expect(await lint('shadow.ts')).toEqual(['@typescript-eslint/no-shadow']);
  });
});
