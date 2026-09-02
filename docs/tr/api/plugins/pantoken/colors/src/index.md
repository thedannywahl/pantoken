[pantoken](../../../../index.md) / colors

# colors

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-colors` — CSS-only color math that mirrors the InstUI `@instructure/ui-color-utils`
helpers (`alpha`, `darken`, `lighten`, `overlayColors`).

InstUI computes those at build time with `tinycolor2` against concrete hex values. pantoken emits
`var(--instui-*)` references that resolve in the browser (often through `light-dark()`), so the
math has to happen in CSS instead. Each helper returns a CSS color string built from
[`color-mix()`](https://developer.mozilla.org/docs/Web/CSS/color_value/color-mix) and
[relative color syntax](https://developer.mozilla.org/docs/Web/CSS/CSS_colors/Relative_colors) —
both Baseline modern-browser features — so a single expression tracks the token even when it's a
scheme-dependent `light-dark()` pair. Use them wherever you'd otherwise hard-code a derived shade.

## Örnek

```ts
import { alpha, darken } from "@pantoken/plugin-colors";

// A subtle brand-tinted hover, derived from the brand token (mirrors InstUI's ghost hover).
const hover = alpha(darken("var(--instui-color-institutional-brand-button-primary-bgd)", 10), 10);
// → "color-mix(in srgb, hsl(from var(--…brand-…) h s calc(l - 10)) 10%, transparent)"
```

## Tür Takma Adları

- [CssColor](type-aliases/CssColor.md)

## Fonksiyonlar

- [alpha](functions/alpha.md)
- [darken](functions/darken.md)
- [lighten](functions/lighten.md)
- [overlayColors](functions/overlayColors.md)
- [onColor](functions/onColor.md)
