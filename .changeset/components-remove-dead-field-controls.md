---
"@pantoken/components": patch
---

Remove dead code left behind by the form-controls CSS migration: the unused `field-controls.ts` helper module and the unused `SELECT_CHEVRON`/`CHEVRON_UP_ICON`/`CHEVRON_DOWN_ICON` constants in `helpers.ts` (superseded by the `.css` records' inlined `var(--instui-icon-*)` masks).
