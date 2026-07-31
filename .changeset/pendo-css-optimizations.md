---
"@pantoken/components": patch
"@pantoken/pendo": minor
"@pantoken/plugin-logos": minor
---

**`@pantoken/plugin-logos`** — adds a `current-color` color mode. Six new source SVGs (one per brand: canvas, igniteai, instructure ×2, learnplatform, mastery, parchment) use `currentColor` so the logo adapts to the surrounding text color via CSS. The generate script now recognises `current-color` as a valid mode; new tokens follow the `--instui-logo-<product>-<layout>-current-color` naming convention.

**`@pantoken/pendo`** — CSS architecture cleanup and token aliases:

- File structure renamed: `manual.css` → `vars.css`, `view.css` → `chrome.css`; `video.css`, `img.css`, and `mask.css` merged into `chrome.css`. The `"icons"` cascade layer is removed; `"vars"` and `"chrome"` replace `"manual"`, `"view"`, `"mask"`, and `"img"` in `LAYER_ORDER`.
- New `--pendo-*` aliases in `vars.css`: `--pendo-space-0`, `--pendo-alert-indent`, `--pendo-embedded-width`, `--pendo-overlay-width`, `--pendo-input-border-style` (workaround for missing upstream border-style token). All 38 `--instui-component-shared-tokens-spacing-general-space-none` references replaced with `--pendo-space-0`.
- Focus-outline delegation extended: `select._pendo-multi-choice-poll-select`, `._pendo-open-text-poll-input`, and `input.pendo-radio` added to `FOCUSABLES`; verbose 5-declaration `:focus` outline blocks removed from `select.css`, `textarea.css`, and `radio-group.css`; only component-specific `background`/`border-color` resets and radio sibling suppression remain.
- Radio-group token overrides resolved: `width`/`height` corrected from `--instui-component-shared-tokens-spacing-general-space-lg` to `--instui-component-radio-input-control-size-sm`; checked-inset `/ 2` compensation removed; `@TODO` comments cleared.
- `@layer` order declaration moved inside `@scope` (was previously hoisted outside by `addScope`, making it dead code); `addScope` now only hoists `@property` at-rules.

**`@pantoken/components`** — adds `/* fallow-ignore-next-line css-duplicate-block */` comments to structurally required duplicate declaration blocks: the visually-hidden clip pattern in `alert.css`, `form-field-messages.css`, and `screen-reader-content.css`; vendor pseudo-element pairs in `range-input.css`.
