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

The package also exports two standalone stylesheets. `custom-theme-colors.css` matches attributes
on `:root`; `custom-theme-colors.scoped.css` matches `[data-pantoken-color]` on any element so an
editable subtree can own its color scheme:

```html
<div data-pantoken-color="sea">...</div>
```

## Custom brand color

Pass any `#rgb`/`#rrggbb` as `custom` to add a `[data-pantoken-color="custom"]` scale derived
from it:

```ts
customThemeColors({ custom: "#cccccc" });
// or, standalone:
customColorCss("#cccccc", { selector: "" });
deriveCustomColorScale("#cccccc"); // { anchorStep: 40, steps: Map { 10 => "#f3f3f3", … } }
```

Each step's lightness is the mean OKLCH lightness of the 13 shipped families at that step, so the
custom scale shares their spacing between white and black. The input lands on the step with the
nearest lightness and is snapped to it, so `#cccccc` becomes `custom-40` at `#c9c9c9`. Every other
step keeps the input's hue, with chroma following the families' average chroma curve and reduced
where needed to stay inside sRGB. Anything that isn't a valid hex throws a `TypeError`.

To derive in the browser without shipping the token set, precompute the curve at build time and
pair it with the dependency-free `/scale` entry. `customColorRemapCss()` emits the static remap
rule, and the page only has to set the 20 `--instui-primitive-color-custom-custom*` values:

```ts
// build time
const curve = customColorReferenceCurve();
const css = customColorRemapCss();

// browser
import { deriveScale } from "@pantoken/plugin-custom-theme-colors/scale";
const { steps } = deriveScale("#e62429", curve);
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
