---
'@jameslnewell/typescript-config': major
---

Modernise the base config: `module`/`moduleResolution` → `NodeNext`, add `target: "ESNext"`, and drop the deprecated `importsNotUsedAsValues`. Consuming packages no longer need to override these per-package.
