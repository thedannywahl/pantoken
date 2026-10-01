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
  [Theme colours](#theme-colours).
- `@pantoken/plugin-custom-components` — token-backed custom controls including SegmentedControl
  and SkeletonLoader.

### Segmented control

Use a segmented control for two to five related views or filters. Each option is a labelled native
radio in one named group; mark one checked initially. Use tabs or a dropdown if the options won't fit
comfortably, and use button groups for actions rather than choices. The `-size-md` style is the
default, with `-size-sm` and `-size-lg` for tighter and more prominent contexts.

Import `@pantoken/plugin-custom-components/segmented-control.css` for the control and its overflow
buttons. Use a `-icon-*` class on a segment label when the segment needs a glyph; the interaction
helper also promotes a `-icon-*` class from its native input to the label painter.
Give the fieldset a descriptive `aria-label` or a visible legend. The helper preserves the native
radio announcement, adds keyboard navigation, and optionally reveals one clipped segment per arrow
press. Use logical start/end controls and accessible button labels in both directions:

```html
<fieldset class="instui-segmented-control" aria-label="Course view" data-overflown>
  <div class="viewport">
    <button class="overflow-start" type="button" aria-label="Previous views" hidden></button>
    <div class="track">
      <label><input type="radio" name="course-view" checked /> Grid</label>
      <label><input type="radio" name="course-view" /> List</label>
    </div>
    <button class="overflow-end" type="button" aria-label="Next views" hidden></button>
  </div>
</fieldset>
```

Import `@pantoken/interactions/segmented-control.iife.js` for DOM-ready registration, or call
`initSegmentedControl(fieldset, { size: "md", isOverflown: true })` from `@pantoken/interactions`
and call `cleanup()` when removing it. The CSS and native radio choices work without JS; overflow
arrows need the behaviour. The selected item uses the two-layer design shadow from the semantic
drop-shadow colours; it is a distinct active-item shadow rather than an existing
`--instui-elevation-*` composite. Overflow buttons use the upstream elevation3 component tokens
through `--pantoken-segmented-overflow-shadow`.

### Skeleton loading

The `skeleton-loader.css` subpath styles one decorative Text, Avatar, or Image shape. Text accepts
`-size-xxs` through `-size-xxl`; Avatar and Image are medium-sized. Each optional `.skeleton-row`
adds one text line without changing the size. The CSS shimmer stops after three 1.5-second sweeps and
stays static when the user prefers reduced motion. It works before JavaScript loads.

Place shapes only where query-dependent content will appear, not over server-known navigation,
filters, headings, or controls. A skeleton is not a progress meter or an action-busy state. Keep
existing content visible during background refreshes; use a spinner or button busy state for actions.

The parent application owns loading, loaded, empty, and error markup. Provide one empty status region
per page and a separate empty alert in the server HTML, both **outside** the busy content region:

```html
<div class="instui-skeleton-loading">
  <span class="instui-screen-reader-content" role="status" data-skeleton-status></span>
  <span class="instui-screen-reader-content" role="alert" data-skeleton-error></span>
  <section data-skeleton-region aria-busy="true">
    <div class="instui-skeleton-loader -type-text -size-md" aria-hidden="true">
      <div class="shape"></div>
      <div class="skeleton-row">
        <div class="shape"></div>
      </div>
    </div>
  </section>
</div>
```

Call the parent-level behaviour when the request state changes. It updates `aria-busy` and the two
pre-existing announcements, but it never replaces content or moves focus:

```ts
import { initSkeletonLoading } from "@pantoken/interactions";

const wrapper = document.querySelector<HTMLElement>(".instui-skeleton-loading")!;
const loading = initSkeletonLoading(wrapper.querySelector<HTMLElement>("[data-skeleton-region]")!, {
  status: wrapper.querySelector<HTMLElement>("[data-skeleton-status]")!,
  error: wrapper.querySelector<HTMLElement>("[data-skeleton-error]")!,
});

loading.setLoading("Loading courses"); // announces after 400ms, unless loading finishes first
loading.setLoaded("24 courses"); // swap in the real content separately
// For an empty result, use setEmpty("No courses found"); for failure, setError("Couldn't load courses. Retry").
loading.cleanup(); // when the owning region is removed
```

If using the per-component interactions bundle instead of the direct import, dispatch a
`pantoken:skeleton-state` event on the `[data-skeleton-region]` element with
`detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. Delay _showing_
placeholders by 200–500ms for fast requests; the behaviour independently delays the loading
announcement by 400ms. On passive page loads, leave focus where it is. Only move focus to a newly
loaded result when the user's own action requested it. The status node announces results and empty
states; the alert node announces failures. Do not combine `aria-busy`, `role="status"`, and
`role="alert"` on one element.

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

## Theme colours

`@pantoken/plugin-custom-theme-colors` emits one `[data-pantoken-color="…"]` block per palette
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Each block points the brand primitives (`--instui-primitive-color-navy-*` and `-blue-*`)
at the chosen palette. It also re-derives the brand surfaces that upstream flattened to literal hex,
keeping their baked alpha through `color-mix()`. Semantic status colours, explicit blue accents, and
elevation shadows stay put. Try it in the
[swatch-based theming demo](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Custom brand colour

Set `data-pantoken-color="custom"` to rebrand from any hex, such as the primary colour a Canvas admin
types into the Theme Editor. pantoken derives a full 10–200 `--instui-primitive-color-custom-*`
scale from it:

1. **Reference curve.** Each step's target lightness is the average OKLCH lightness of the 13
   palettes at that step, with 0 fixed at white and 210 at black. So the custom scale's spacing
   matches the shipped palettes'.
2. **Anchor.** The input lands on the step whose target lightness is nearest its own, then snaps to
   that exact lightness. `#cccccc` becomes `custom-40` at `#c9c9c9`: close to the input, but not
   always identical. "Nearest" means nearest step on the curve, not the closest existing palette
   colour.
3. **Fill.** Every other step keeps the input's hue. Its saturation follows the palettes' average
   saturation curve relative to the anchor, and is reduced only where a colour falls outside sRGB.

Only `#rgb` and `#rrggbb` are accepted; anything else throws a `TypeError`, so a hex from a form
can't inject CSS.

At build time, emit the whole rule with the derived primitives already declared:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

To pick the colour at runtime without shipping the token set, precompute the curve and the remap
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
