---
"@pantoken/components": patch
---

Generated stylesheets (`base.css`, `components.css`, `prose.css`, `select.css`) now pass through `applyMinify({ flatten: true })` during the generate step, consistent with the cross-pipeline flattening approach. No behavioral change — component CSS does not contain `@property` blocks.
