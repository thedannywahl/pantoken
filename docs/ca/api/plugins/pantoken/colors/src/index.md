[pantoken](../../../../index.md) / colors

# colors

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-colors` — matemàtica de color només CSS que reflecteix els ajudants `@instructure/ui-color-utils` d'InstUI (`alpha`, `darken`, `lighten`, `overlayColors`).

InstUI calcula aquests en temps de construcció amb `tinycolor2` contra valors hex concrets. pantoken emet
`var(--instui-*)` referències que es resolen al navegador (sovint a través de `light-dark()`), de manera que la
matemàtica ha de succeir a CSS en lloc d'això. Cada ajudant retorna una cadena de color CSS construïda a partir de
[`color-mix()`](https://developer.mozilla.org/docs/Web/CSS/color_value/color-mix) i
[sintaxi de color relatiu](https://developer.mozilla.org/docs/Web/CSS/CSS_colors/Relative_colors) —
ambdós són funcionalitats Baseline del navegador modern — de manera que una única expressió rastreja el token fins i tot quan és un
parell dependent del esquema `light-dark()`. Utilitzeu-los allà on altrament codificarieu una tonalitat derivada.

## Exemple

```ts
import { alpha, darken } from "@pantoken/plugin-colors";

// A subtle brand-tinted hover, derived from the brand token (mirrors InstUI's ghost hover).
const hover = alpha(darken("var(--instui-color-institutional-brand-button-primary-bgd)", 10), 10);
// → "color-mix(in srgb, hsl(from var(--…brand-…) h s calc(l - 10)) 10%, transparent)"
```

## Àlies de tipus

- [CssColor](type-aliases/CssColor.md)

## Funcions

- [alpha](functions/alpha.md)
- [darken](functions/darken.md)
- [lighten](functions/lighten.md)
- [overlayColors](functions/overlayColors.md)
- [onColor](functions/onColor.md)
