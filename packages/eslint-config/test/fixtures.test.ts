import {describe, expect, it} from 'vitest';
import {ESLint} from 'eslint';
import {resolve} from 'node:path';

const fixturesDirectory = resolve(import.meta.dirname, '__fixtures__');

// Only errors fail a lint run, so warnings aren't returned.
async function lint(fixture: string): Promise<string[]> {
  const eslint = new ESLint({
    cwd: fixturesDirectory,
    overrideConfigFile: resolve(import.meta.dirname, '../node.mjs'),
  });
  const results = await eslint.lintFiles([resolve(fixturesDirectory, fixture)]);
  return results.flatMap((result) =>
    result.messages
      .filter((message) => message.severity === 2)
      .map((message) => message.ruleId ?? message.message),
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

  it('should fail on functions and function types declared with more than two parameters', async () => {
    expect(await lint('many-params.ts')).toEqual(
      Array(10).fill('@jameslnewell/prefer-options-object'),
    );
  });

  it('should pass on functions whose parameters another API dictates', async () => {
    expect(await lint('dictated-params.ts')).toEqual([]);
  });

  it('should pass on ambient declarations', async () => {
    expect(await lint('ambient.d.ts')).toEqual([]);
    expect(await lint('ambient.d.mts')).toEqual([]);
    expect(await lint('declared.ts')).toEqual([]);
  });

  it('should report the parameters, not the whole function', async () => {
    const eslint = new ESLint({
      cwd: fixturesDirectory,
      overrideConfigFile: resolve(import.meta.dirname, '../node.mjs'),
    });
    const [result] = await eslint.lintFiles([
      resolve(fixturesDirectory, 'many-params.ts'),
    ]);
    expect(result?.messages[0]).toMatchObject({
      line: 1,
      column: 21,
      endLine: 1,
      endColumn: 52,
    });
  });

  it('should fail on functions declared with more than two parameters in JavaScript files', async () => {
    expect(await lint('many-params.js')).toEqual([
      '@jameslnewell/prefer-options-object',
    ]);
  });

  it('should fail on any, non-null assertions and ts-ignore', async () => {
    expect(await lint('escape-hatches.ts')).toEqual(
      expect.arrayContaining([
        '@typescript-eslint/ban-ts-comment',
        '@typescript-eslint/no-explicit-any',
        '@typescript-eslint/no-non-null-assertion',
      ]),
    );
  });

  it('should fail on focused and disabled tests', async () => {
    expect(await lint('focused-and-disabled.test.ts')).toEqual([
      'vitest/no-focused-tests',
      'vitest/no-disabled-tests',
    ]);
  });
});
