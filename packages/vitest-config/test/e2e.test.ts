import {expect, test} from 'vitest';

test('runs e2e tests from test/', () => {
  expect(import.meta.filename).toMatch(/\/test\/e2e\.test\.ts$/);
});
