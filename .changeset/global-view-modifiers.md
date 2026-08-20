---
"@pantoken/components": minor
"@pantoken/utils": minor
---

Make `view`'s and `text`'s key-value modifiers (background, border, shadow, display, position,
overflow, cursor, colour, weight, size) available globally, without requiring the `.instui-view`/
`.instui-text` base class:

- Every one of these modifiers now also works as a bare, standalone class (`instui-bg-secondary`) and
  as a component-attached alias on any other component (`.instui-button.-bg-danger`) — the same dual
  pattern `spacing`/`gap` already used, generalized via a new shared `GLOBAL_ALIAS_TARGETS`/
  `globalSelectors()` helper.
- Reuses existing global class words (`bg`, `text`, `border`, `border-radius`, `border-width`,
  `box-shadow`, `display`, `text-align`, `font-weight`) rather than inventing parallel vocabulary; only
  genuinely new concepts get a new utility (`position`, `overflow`, `cursor`, a new `font-size`
  utility, and a global `mask`/`mask-fullscreen`/`mask-blur` copy of the `mask` component's modifiers).
- `view` and `mask` moved from `utilities/` to `components/` (still exported as `viewCss`/`maskCss`
  from the package root — their own chained modifiers are unchanged) so they can participate in the
  same component-list the dual selectors chain onto.
- `@pantoken/utils`'s `colorUtilitiesCss`/`tokenUtilitiesCss` gained an optional `chainTargets` option
  for the dual-selector behavior, and `colorUtilitiesCss` now accepts explicit `[name, value]` pairs
  (not just prefix-relative names) so a component's own token family can feed the same class word.
  Also fixes a doc/code mismatch: the text-colour utility's class is now `.instui-text-<name>` (as its
  own doc comment always claimed), not `.instui-fg-<name>`.
- `cssdoc.jsonc` pins `globalPrecedence: "base"` explicitly, so a component's own modifier always wins
  over a same-named global-utility copy.
- `responsive`'s viewport/container show-hide classes stay bare-only (not dual-chained) — their
  breakpoint × infix × alias-name surface is already large enough that adding ~70 more chained
  selectors per rule makes the shared alias post-processors unusably slow.
