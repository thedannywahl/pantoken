---
"@pantoken/tokens": minor
"@pantoken/plugin-custom-components": minor
"@pantoken/components": patch
"@pantoken/css": patch
"@pantoken/dtcg": patch
"@pantoken/scss": patch
"@pantoken/less": patch
"@pantoken/stylus": patch
---

Bump `@instructure/instructure-design-tokens` from `v1.5.0` to `v1.8.0`.

- New dedicated `--instui-component-card-*` tokens (border-radius, padding, background, nested-border,
  and breakpoints) replace the legacy `--instui-component-shared-tokens-*card*` variables the custom
  `card` component previously used. `card`'s `lg` breakpoint moves from 684px (42.75rem) to 640px
  (40rem) to match the new dedicated `--instui-component-card-breakpoint-lg` value — a visible sizing
  change at that breakpoint.
- New `banner` custom component (`@pantoken/plugin-custom-components`), backed by the new
  `--instui-component-banner-*` tokens: `-size-relaxed`/`-size-compact`, `-color-violet`/`-color-sea`,
  and a `-variant-ai` gradient fill, plus an icon swatch and close-button placement.
- New `--instui-component-tag-lead-element-label` spacing token (not yet consumed by `tag`).
- New `--instui-color-background-pastel-{violet,sea}` semantic colors (feed the new `banner` tokens).
- `rebrandLight`'s `interactive.action.secondary.{base,hover,active}` colors were recolored upstream
  (flows through automatically; no code change).
- Retired two deprecation-ledger shims whose `removeIn` milestone (`design-tokens@v1.6.0`) was reached:
  `--instui-component-truncate-text-line-height` (the `truncate` utility now references its replacement,
  `--instui-line-height-paragraph-base`, directly) and `--instui-component-badge-notification-z-index`
  (the real upstream token has returned with a proper `<integer>` `@property` syntax, so the frozen
  shim is no longer needed).
