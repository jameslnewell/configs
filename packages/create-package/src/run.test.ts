import {afterEach, describe, expect, it, vi} from 'vitest';
import {run} from './run.js';

function silence(): void {
  vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
  vi.spyOn(process.stderr, 'write').mockImplementation(() => true);
}

describe('run', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns 1 when --variant is missing', async () => {
    silence();
    expect(await run(['some-dir'])).toBe(1);
  });

  it('returns 1 for an invalid --variant', async () => {
    silence();
    expect(await run(['--variant', 'service', 'some-dir'])).toBe(1);
  });

  it('returns 1 when the directory argument is missing', async () => {
    silence();
    expect(await run(['--variant', 'lib'])).toBe(1);
  });

  it('returns 1 for an unknown option', async () => {
    silence();
    expect(await run(['--nope', '--variant', 'lib', 'dir'])).toBe(1);
  });

  it('returns 0 for --help', async () => {
    silence();
    expect(await run(['--help'])).toBe(0);
  });
});
