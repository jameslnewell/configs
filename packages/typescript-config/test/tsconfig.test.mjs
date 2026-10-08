import {describe, expect, test} from 'vitest';
import {execFile} from 'node:child_process';
import {resolve} from 'node:path';

const fixturesDirectory = resolve(import.meta.dirname, '__fixtures__');

/**
 * Type-checks every fixture with a single `tsc` run and groups the reported
 * error codes by fixture file.
 *
 * @returns {Promise<Map<string, string[]>>}
 */
async function check() {
  const output = await new Promise((resolvePromise) => {
    execFile(
      'tsc',
      ['--project', fixturesDirectory, '--pretty', 'false'],
      {cwd: fixturesDirectory},
      (_error, stdout) => {
        resolvePromise(stdout);
      },
    );
  });
  /** @type {Map<string, string[]>} */
  const errors = new Map();
  for (const match of String(output).matchAll(
    /^(?<file>[^(\n]+)\(\d+,\d+\): error (?<code>TS\d+)/gm,
  )) {
    const {file = '', code = ''} = match.groups ?? {};
    errors.set(file, [...(errors.get(file) ?? []), code]);
  }
  return errors;
}

describe('tsconfig.json', async () => {
  const errors = await check();

  test('accepts valid code', () => {
    expect(errors.get('valid.ts')).toBeUndefined();
    expect(errors.get('shape.ts')).toBeUndefined();
  });

  test.each([
    ['erasable-syntax-only.ts', 'TS1294'],
    ['verbatim-module-syntax.ts', 'TS1484'],
    ['exact-optional-property-types.ts', 'TS2375'],
    ['no-unchecked-indexed-access.ts', 'TS2322'],
    ['no-unused-locals.ts', 'TS6133'],
    ['allow-unreachable-code.ts', 'TS7027'],
  ])('rejects %s', (file, code) => {
    expect(errors.get(file)).toContain(code);
  });
});
