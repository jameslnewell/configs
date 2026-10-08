import {describe, expect, test} from 'vitest';
import {slugify} from './slugify.ts';

describe('slugify', () => {
  test('lowercases and hyphenates words', () => {
    expect(slugify('Hello, World!')).toBe('hello-world');
  });

  test('strips accents', () => {
    expect(slugify('Café au lait')).toBe('cafe-au-lait');
  });

  test('uses a custom separator', () => {
    expect(slugify('Hello World', {separator: '_'})).toBe('hello_world');
  });
});
