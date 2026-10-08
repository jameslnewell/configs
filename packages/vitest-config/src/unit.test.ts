import {expect, test} from 'vitest';

test('runs unit tests from src/', () => {
  expect(import.meta.filename).toMatch(/\/src\/unit\.test\.ts$/);
});
