# @pantoken/plugin-colors

CSS-only color math that mirrors the InstUI `@instructure/ui-color-utils` helpers, so derived shades
track pantoken's `var(--instui-*)` tokens at runtime instead of being baked to a fixed hex.

InstUI computes `alpha`, `darken`, `lighten`, and `overlayColors` at build time with `tinycolor2`
against concrete colors. pantoken emits token references that resolve in the browser — often through
`light-dark()` — so the same math has to run in CSS. Each helper returns a CSS color string built on
`color-mix()` and relative color syntax (both Baseline modern-browser features).

## Install

```sh
npm i @pantoken/plugin-colors
```

Also available as `pantoken/colors`.

## Usage

```ts
import { alpha, darken, lighten, overlayColors } from "@pantoken/plugin-colors";

alpha("var(--brand)", 10); // color-mix(in srgb, var(--brand) 10%, transparent)
darken("var(--brand)", 10); // hsl(from var(--brand) h s calc(l - 10))
lighten("var(--brand)", 10); // hsl(from var(--brand) h s calc(l + 10))
overlayColors("var(--surface)", "var(--brand)", 12); // color-mix(in srgb, var(--brand) 12%, var(--surface))
onColor("var(--brand)"); // black or white, whichever reads on the surface (InstUI's *-on-color idea)

// Compose them the way InstUI does — e.g. a brand-tinted ghost-button hover:
const ghostHover = alpha(
  darken("var(--instui-color-institutional-brand-button-primary-bgd)", 10),
  10,
);
```

## Mapping to ui-color-utils

| ui-color-utils (tinycolor)  | This helper     | CSS mechanism                       |
| --------------------------- | --------------- | ----------------------------------- |
| `alpha(color, percent)`     | `alpha`         | `color-mix()` with `transparent`    |
| `darken(color, percent)`    | `darken`        | `hsl(from …)` relative color syntax |
| `lighten(color, percent)`   | `lighten`       | `hsl(from …)` relative color syntax |
| `overlayColors(c1, c2)`     | `overlayColors` | `color-mix()` (opaque base only)    |
| `*-on-color` token variants | `onColor`       | `oklch(from …)` contrast clamp      |

`darken`, `lighten`, and `overlayColors` cover the RGBA-over-opaque case; general RGBA-over-RGBA
compositing can't be a single CSS color, so it's out of scope. `onColor` mirrors InstUI's recurring
`*-on-color` variants (focus-ring-on-color, primary-inverse, and more) — instead of a fixed inverse
token, it derives black/white contrast from the surface, so it tracks whatever colour it sits on.
