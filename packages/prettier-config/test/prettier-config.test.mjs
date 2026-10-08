import {expect, test} from 'vitest';
import config from '../prettier-config.mjs';
import {format} from 'prettier';

test('formats code according to the config', async () => {
  const input = [
    'import { a, b } from "./module.js"',
    'const object = { first: "first", second: "second", third: "third", fourth: 4, fifth: 5 }',
    '',
  ].join('\n');
  expect(await format(input, {...config, parser: 'typescript'})).toBe(
    [
      "import {a, b} from './module.js';",
      'const object = {',
      "  first: 'first',",
      "  second: 'second',",
      "  third: 'third',",
      '  fourth: 4,',
      '  fifth: 5,',
      '};',
      '',
    ].join('\n'),
  );
});
