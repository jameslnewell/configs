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
});
