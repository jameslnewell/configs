import {expect, it} from 'vitest';

it.only('should be the only test that runs', () => {
  expect(true).toBe(true);
});

it.skip('should be skipped', () => {
  expect(true).toBe(true);
});
