---
"@pantoken/scaffold": patch
---

Fix the `canvas-theme-editor` scaffold's TinyMCE wiring: the `pantoken_templates` plugin registration
used a non-constructible arrow function (TinyMCE always instantiates plugins with `new`, throwing
"Plugin is not a constructor"), and the components/icons/logos picker plugins were registered inside
an unwaited async IIFE that raced with `tinymce.init()`, causing those plugins to 404 as external
scripts instead of using the already-registered in-memory ones.
