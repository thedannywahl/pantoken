---
"@pantoken/components": major
"@pantoken/utils": major
"@pantoken/plugin-primitives": major
---

Global utility modifiers (background/text/border color, border-radius, border-width, box-shadow, font-weight, font-family, line-height, opacity, display, text-align, position, overflow, cursor, stacking, mask, truncate, margin/padding/gap spacing) are now spelled with a **double dash** (`--bg-secondary`, `--mt-xl`, `--display-flex`, ...) instead of a single dash (`-bg-secondary`). This is a breaking rename: the old single-dash global-modifier classes no longer exist.

Why: a single-dash global modifier could collide in name with — and lose the cascade to — a component's own single-dash modifier, entirely dependent on unpredictable CSS import order (`cssdoc.jsonc`'s `globalPrecedence` only ever affected generated documentation, never real browser cascade). The `--` namespace never collides, and now wins deterministically via the modifier class repeated 3x, giving it (0,3,0) specificity — a guaranteed edge over any 2-class component-modifier compound, regardless of source order.

This also means every global modifier now works on **any** registered component automatically — core (`@pantoken/components`) or plugin-authored (e.g. `@pantoken/plugin-custom-components`'s `card`/`agent-shell`) — with no per-package enumeration and no author effort, and `spacing` gained the same chainable behavior other utilities already had (previously bare-only, to avoid a real ~3s/940KB generation-time regression from enumerating every core component per rule — the new mechanism has a fixed selector size per rule regardless of component count).

`@pantoken/utils`'s `colorUtilitiesCss`/`tokenUtilitiesCss` dropped the `chainTargets` option (superseded by the new `globalModifierSelector` mechanism, exported from `@pantoken/utils`). `@pantoken/plugin-primitives`'s font-family/font-weight utility classes (built on `tokenUtilitiesCss`) are renamed the same way; its color (`bg`/`fg`/`border`) classes are unaffected (authored separately, not through the shared helper).
