import {expect, test} from 'vitest';
import {slugify} from '../src/index.ts';

test('exports slugify from the entrypoint', () => {
  expect(slugify('An Example')).toBe('an-example');
});
