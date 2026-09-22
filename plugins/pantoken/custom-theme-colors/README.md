# `@pantoken/plugin-custom-theme-colors`

A pantoken plugin providing custom theme color rules and variables for site theme color selection across 13 color namespaces (`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`, `aurora`).

## Usage

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { customThemeColors } from "@pantoken/plugin-custom-theme-colors";

const css = toCss(byTheme("rebrand"), {
  plugins: [customThemeColors()],
});
```

## Preservation Policy

Custom color selection remaps the brand primitives (`navy` and `blue`). Upstream flattens some
tokens — secondary action backgrounds and strokes, base button component colors, and the
institutional brand button fill — to literal hex with a baked alpha, so those values are traced
back to the brand primitive they came from and relinked to the selected scale via `color-mix()`.
Both sides of a `light-dark()` value are relinked; colors inside icon data URIs are left alone.

Explicitly blue accents and semantic status intents (`info`, `success`, `warning`, and `error`,
including pastel status backgrounds) retain their source-theme values so color selection never
changes their meaning. Elevation shadow colors are also left alone for now, pending a design
decision on whether shadows should be brand-tinted.
