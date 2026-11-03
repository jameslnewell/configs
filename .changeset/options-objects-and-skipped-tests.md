---
'@jameslnewell/eslint-config': major
---

Report functions you declare with more than two parameters, and skipped tests, as errors.

- The new `@jameslnewell/prefer-options-object` rule reports functions, methods and function types you declare with more than two parameters; take an options object instead. Functions whose parameters another API dictates (e.g. a callback passed to `.reduce()`, or a function assigned to a variable typed `ErrorRequestHandler`, or a method overriding a base class's) aren't reported, and nor are `this` parameters, constructor parameter properties or ambient declarations.
- `vitest/no-disabled-tests` is an error instead of a warning, so a skipped test fails the lint run.

To migrate, change functions with more than two parameters to take an options object, and remove or un-skip skipped tests.
