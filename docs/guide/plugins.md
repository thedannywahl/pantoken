# Plugins

A pantoken plugin extends the token or CSS output without forking a package. You build one with
`definePlugin` from `@pantoken/plugin-kit`, then pass it to `buildTokens` or `toCss`.

## Author a plugin

Give `definePlugin` the hooks you implement. It returns a normal plugin, branded with the
capabilities inferred from those hooks. A plugin can extend the IR (`tokens`, `icons`), the CSS
output (`css`), or both.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Capability-aware registration

`buildTokens` and `toCss` run `checkPlugins` over the plugins you pass. It warns — it never throws —
when a plugin has no matching hook for the stage it's registered in, so a token-only plugin passed
to `toCss` is skipped with a note rather than silently doing nothing.

## Compose plugins

Build on top of another plugin with `extendPlugin`, or combine peers with `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Same-stage hooks compose: `tokens` runs the base then the addition, `css` merges the two
contributions, and `icons` runs both.

## Validate your plugin's output

Run the shared drift checks from `@pantoken/utils` over your plugin's own output in its test, so a
typo or a renamed token fails fast and locally:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## The bundled plugins

- `@pantoken/plugin-simple-icons` — brand icons from simple-icons, registered as icon tokens.
- `@pantoken/plugin-lucide-lab` — Lucide Lab icons, registered as `--instui-icon-*` image tokens.
- `@pantoken/plugin-logos` — Instructure product logos as SVGs, data URIs, and `--instui-logo-*`
  image tokens.
- `@pantoken/plugin-prune-custom-props` — a PostCSS plugin (not a pantoken plugin) that drops
  unused custom properties from a stylesheet.
- `@pantoken/plugin-custom-theme-colors` — rebrands a page by setting one attribute
  (`data-pantoken-color`) to one of 13 palettes, or to `custom` for any brand hex. See
  [Theme colors](#theme-colors).

Lucide Lab's registry can be loaded lazily, then passed to the synchronous token hook:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

A few things that used to be plugins now ship in `@pantoken/components`, since so many components need
them out of the box: elevation shadows (`--instui-elevation-*`, in `components.css`), the focus-outline
ring (in `base.css` — every focusable gets it when pantoken owns the page), and the Instructure brand
fonts (Atkinson Hyperlegible Next: `base.css` applies `--instui-font-family-base`; the opt-in
`@pantoken/components/fonts.css` loads the `@font-face` woff2s).

## Theme colors

`@pantoken/plugin-custom-theme-colors` emits one `[data-pantoken-color="…"]` block per palette
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Each block points the brand primitives (`--instui-primitive-color-navy-*` and `-blue-*`)
at the chosen palette. It also re-derives the brand surfaces that upstream flattened to literal hex,
keeping their baked alpha through `color-mix()`. Semantic status colors, explicit blue accents, and
elevation shadows stay put. Try it in the
[swatch-based theming demo](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Custom brand color

Set `data-pantoken-color="custom"` to rebrand from any hex, such as the primary color a Canvas admin
types into the Theme Editor. pantoken derives a full 10–200 `--instui-primitive-color-custom-*`
scale from it:

1. **Reference curve.** Each step's target lightness is the average OKLCH lightness of the 13
   palettes at that step, with 0 fixed at white and 210 at black. So the custom scale's spacing
   matches the shipped palettes'.
2. **Anchor.** The input lands on the step whose target lightness is nearest its own, then snaps to
   that exact lightness. `#cccccc` becomes `custom-40` at `#c9c9c9`: close to the input, but not
   always identical. "Nearest" means nearest step on the curve, not the closest existing palette
   color.
3. **Fill.** Every other step keeps the input's hue. Its saturation follows the palettes' average
   saturation curve relative to the anchor, and is reduced only where a color falls outside sRGB.

Only `#rgb` and `#rrggbb` are accepted; anything else throws a `TypeError`, so a hex from a form
can't inject CSS.

At build time, emit the whole rule with the derived primitives already declared:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

To pick the color at runtime without shipping the token set, precompute the curve and the remap
rule at build time. Then use the dependency-free `/scale` entry in the browser, and set only the 20
derived primitives:

```ts
// Build time
import {
  customColorReferenceCurve,
  customColorRemapCss,
} from "@pantoken/plugin-custom-theme-colors";

const curve = customColorReferenceCurve(); // JSON-safe
const remapCss = customColorRemapCss(); // ship alongside the palette stylesheet
```

```ts
// Browser
import { deriveScale } from "@pantoken/plugin-custom-theme-colors/scale";

const { anchorStep, steps } = deriveScale(input.value, curve);
style.textContent = `:root[data-pantoken-color="custom"] { ${[...steps]
  .map(([step, hex]) => `--instui-primitive-color-custom-custom${step}: ${hex};`)
  .join(" ")} }`;
document.documentElement.dataset.pantokenColor = "custom";
```

The docs site's theme picker, the Canvas theme editor, and the demo above all work this way.

See the [API reference](/api/) for each plugin's exports.
