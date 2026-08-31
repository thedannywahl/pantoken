[pantoken](../../../../index.md) / colors

# colors

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-colors` — CSS-kun farveregning, der afspejler InstUI `@instructure/ui-color-utils`
hjælpere (`alpha`, `darken`, `lighten`, `overlayColors`).

InstUI beregner disse på byggetidspunkt med `tinycolor2` mod konkrete hex-værdier. pantoken udsender
`var(--instui-*)` referencer, der opløses i browseren (ofte gennem `light-dark()`), så
matematikken skal foregå i CSS i stedet. Hver hjælper returnerer en CSS-farvestreng bygget fra
[`color-mix()`](https://developer.mozilla.org/docs/Web/CSS/color_value/color-mix) og
[relativ farvesyntaks](https://developer.mozilla.org/docs/Web/CSS/CSS_colors/Relative_colors) —
begge Baseline moderne-browser-funktioner — så et enkelt udtryk sporer tokenet, selv når det er et
skema-afhængigt `light-dark()` par. Brug dem, hvor du ellers ville hard-code en afledt skygge.

## Example

```ts
import { alpha, darken } from "@pantoken/plugin-colors";

// A subtle brand-tinted hover, derived from the brand token (mirrors InstUI's ghost hover).
const hover = alpha(darken("var(--instui-color-institutional-brand-button-primary-bgd)", 10), 10);
// → "color-mix(in srgb, hsl(from var(--…brand-…) h s calc(l - 10)) 10%, transparent)"
```

## Type Aliases

- [CssColor](type-aliases/CssColor.md)

## Functions

- [alpha](functions/alpha.md)
- [darken](functions/darken.md)
- [lighten](functions/lighten.md)
- [overlayColors](functions/overlayColors.md)
- [onColor](functions/onColor.md)
