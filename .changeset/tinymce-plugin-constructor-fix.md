---
"@pantoken/tinymce": patch
---

Fix the components/icons/logos picker plugins throwing `TypeError: Plugin is not a constructor` on
init. TinyMCE always instantiates registered plugins with `new Plugin(editor, url)`; the plugin
factories returned arrow functions, which aren't constructible. They now return named `function`
expressions.
