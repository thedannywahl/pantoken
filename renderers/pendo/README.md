# @pantoken/pendo

An Instructure-styled global stylesheet for Pendo guides, built on pantoken tokens.

Pendo injects guide HTML into a host page. This renders that guide DOM (`._pendo-*`) to match Instructure UI: buttons, cards, popovers, alerts, selects, text areas, radios, NPS and number-scale polls, dividers, images, and video. The component CSS is ported from `@instructure/pendo-global-css`; pantoken supplies the `--instui-*` token layer and assembles the result.

## Install

```sh
npm i @pantoken/pendo
```

Also available as `pantoken/pendo`.

## Use

Import the ready-made stylesheet, or the static file:

```ts
import { pendoCss } from "@pantoken/pendo";
```

```css
@import "@pantoken/pendo/global.css";
```

Or build a variant:

```ts
import { buildPendoCss } from "@pantoken/pendo";

const css = buildPendoCss({
  theme: "canvas", // token theme (default "rebrand")
  scope: true, // wrap in @scope for containment (default true)
  important: true, // add !important so guide styles beat Pendo's (default true)
  prune: true, // tree-shake unused --instui-* tokens (default true)
});
```

### CLI

```sh
pantoken generate pendo --out ./pendo
pantoken generate pendo --out ./pendo --theme canvas --no-scope --no-important
```

Writes `global.css`.

## How it fits together

- **Token layer** — pantoken's `@pantoken/css` emits the `--instui-*` custom properties, scoped to the guide container `[class*="instui"]`. This is the drop-in replacement for pendo-styles' generated `vendor/tokens.css`.
- **Component layers** — the ported `._pendo-*` rules, assembled in a fixed `@layer` cascade order. Layered `!important` is what keeps guide styles above Pendo's own unlayered `!important`.
- **Package-local transforms** (`src/plugins/`, PostCSS, scoped to this package — Pendo deployment behavior, not general pantoken plugins):
  - `add-important` — adds `!important` to component declarations.
  - `add-scope` — wraps everything in `@scope (._pendo-step-container)` for DOM containment.
- **Token pruning** — [`@pantoken/plugin-prune-custom-props`](../../plugins/postcss/prune-custom-props), a shared plugin (any renderer built on the full token layer wants it). It tree-shakes the token set to only what the guide references, dropping ≈1,800 unused icon data-URIs — the full build is ~95 KB instead of ~1.7 MB.
- **Focus ring** — [`@pantoken/plugin-focus-outline`](../../plugins/pantoken/focus-outline) provides the animated ring for the plain focusables (`._pendo-button`, `._pendo-close-guide`, `._pendo-text-link`) in a last-declared `instui.focusOutline` layer. Components with custom focus behavior (select/textarea background resets, the radio and number-scale sibling outlines, the card's `:focus-visible` reset) keep their own rules, now referencing the plugin's `--instui-focus-outline-*` tokens.

Every `var(--instui-*)` the ported CSS references resolves against pantoken's token layer — a test asserts full coverage.

## Not included yet

These are deployment concerns handled downstream in pendo-styles and are left to the consumer:

- Per-app guide-prefix rewriting (`guide-<theme>` → `guide-<app>-<theme>`).
- Dark-mode format conversion (this ships `light-dark()` as-is).
- Per-app `overrides.css`.

## Credits

Component CSS ported from [`@instructure/pendo-global-css`](https://github.com/instructure) (MIT).

## License

MIT
