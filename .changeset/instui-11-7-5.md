---
"@pantoken/core": patch
"@pantoken/tokens": patch
"@pantoken/react-markdown": patch
---

chore: upgrade to Instructure UI 11.7.5

Bump `@instructure/ui-icons` and related `@instructure/ui-*` packages (heading, text, link, list, table, view, img, alerts) from 11.7.4 to 11.7.5. This patch release adds two new custom icons (`user-round-star`, `venetian-mask-stem`), fixes accessibility/prop-level issues in components (Checkbox toggle, TextInput/Select, InlineSVG), and includes ref-plumbing fixes for Transition-wrapped components. No token removals or deprecations; all downstream packages regenerated successfully via the upgrade pipeline.
