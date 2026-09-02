# CSS: text

`.instui-text` · <span class="instui-pill -color-success pantoken-doc-tag">stable</span> — Tipografia de text del cos amb modificadors de mida, pes, color i estil.

Els presets `-variant-*` i els modificadors `-color-*`/`-size-*`/`-weight-*` es componen tots al mateix element; a diferència de `heading`, no renderitza cap nivell semàntic implícit.

**Font:** [text.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/text/text.css)

## Ús

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/text.css";
```

## Exemples

```html
<span class="instui-text -size-xs --display-block">x-small text</span>
<span class="instui-text -size-sm --display-block">small text</span>
<span class="instui-text -variant-content-quote --display-block">Quoted text</span>
<span class="instui-text -color-ai-highlight">AI highlight text</span>
```

## Modificadors

| Modificador | Descripció |
| --- | --- |
| `.-color-ai` | <span class="instui-pill -color-danger pantoken-doc-tag">Deprecat</span> — use `.-color-ai-highlight`. |
| `.-color-ai-highlight` | Color de text d'accent d'IA amb destacat de fons. |
| `.-color-brand` | Color de text de marca. |
| `.-color-danger` | Color de text de perill. |
| `.-color-primary` | Color de text primari. |
| `.-color-primary-inverse` | Color de text sobre fons fosc (primari invers). |
| `.-color-primary-on` | Color de text primari sobre un fons de color. |
| `.-color-secondary` | Color de text secundari (silenciat). |
| `.-color-secondary-inverse` | Color de text sobre fons fosc (secundari invers). |
| `.-color-secondary-on` | Color de text secundari sobre un fons de color. |
| `.-color-success` | Color de text d'èxit. |
| `.-color-warning` | Color de text d'avís. |
| `.-size-large` | Gran. Àlias de forma llarga de `-size-lg`. |
| `.-size-lg` | Gran. |
| `.-size-sm` | Petit. |
| `.-size-small` | Petit. Àlias de forma llarga de `-size-sm`. |
| `.-size-x-large` | Molt gran. Àlias de forma llarga de `-size-xl`. |
| `.-size-x-small` | Molt petit. Àlias de forma llarga de `-size-xs`. |
| `.-size-xl` | Molt gran. |
| `.-size-xs` | Molt petit. |
| `.-style-italic` | Cursiva. |
| `.-transform-capitalize` | Majúscula cada paraula. |
| `.-transform-lowercase` | Text en minúscules. |
| `.-transform-uppercase` | Text en majúscules. |
| `.-variant-content` | Preestablert de tipus de contingut. |
| `.-variant-content-important` | Preestablert de tipus de contingut important. |
| `.-variant-content-quote` | Preestablert de tipus de contingut de cita. |
| `.-variant-content-small` | Preestablert de tipus de contingut petit. |
| `.-variant-description-page` | Preestablert de tipus de descripció de pàgina. |
| `.-variant-description-section` | Preestablert de tipus de descripció de secció. |
| `.-variant-legend` | Preestablert de tipus de llegenda. |
| `.-weight-bold` | Pes negreta. |

## Tokens consumits

| Token | Tipus | Valor |
| --- | --- | --- |
| `--instui-color-institutional-brand-font-color-dark` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-color-institutional-brand-primary` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-text-ai-background-color` | `<color>` | `light-dark(#F3E5F7, #6D3984)` |
| `--instui-component-text-ai-color` | `<color>` | `light-dark(#8A49A7, #F3E5F7)` |
| `--instui-component-text-base-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-text-base-on-color` | `<color>` | `#ffffff` |
| `--instui-component-text-content-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-text-content-font-size` | `<length>` | `1rem` |
| `--instui-component-text-content-font-weight` | `<integer>` | `400` |
| `--instui-component-text-content-important-font-size` | `<length>` | `1rem` |
| `--instui-component-text-content-important-font-weight` | `<integer>` | `600` |
| `--instui-component-text-content-important-line-height` | `<percentage>` | `150%` |
| `--instui-component-text-content-line-height` | `<percentage>` | `150%` |
| `--instui-component-text-content-quote-font-size` | `<length>` | `1rem` |
| `--instui-component-text-content-quote-font-style` | — | `italic` |
| `--instui-component-text-content-quote-font-weight` | `<integer>` | `500` |
| `--instui-component-text-content-quote-line-height` | `<percentage>` | `150%` |
| `--instui-component-text-content-small-font-size` | `<length>` | `0.875rem` |
| `--instui-component-text-content-small-font-weight` | `<integer>` | `400` |
| `--instui-component-text-content-small-line-height` | `<percentage>` | `150%` |
| `--instui-component-text-description-page-font-size` | `<length>` | `1.25rem` |
| `--instui-component-text-description-page-font-weight` | `<integer>` | `400` |
| `--instui-component-text-description-page-line-height` | `<percentage>` | `150%` |
| `--instui-component-text-description-section-font-size` | `<length>` | `1rem` |
| `--instui-component-text-description-section-font-weight` | `<integer>` | `400` |
| `--instui-component-text-description-section-line-height` | `<percentage>` | `150%` |
| `--instui-component-text-error-color` | `<color>` | `light-dark(#CF1F24, #FA917F)` |
| `--instui-component-text-font-size-large` | `<length>` | `1.75rem` |
| `--instui-component-text-font-size-medium` | `<length>` | `1rem` |
| `--instui-component-text-font-size-small` | `<length>` | `0.875rem` |
| `--instui-component-text-font-size-x-large` | `<length>` | `2.5rem` |
| `--instui-component-text-font-size-x-small` | `<length>` | `0.75rem` |
| `--instui-component-text-font-weight-bold` | `<integer>` | `600` |
| `--instui-component-text-font-weight-normal` | `<integer>` | `400` |
| `--instui-component-text-inverse-color` | `<color>` | `light-dark(#ffffff, #1C222B)` |
| `--instui-component-text-legend-font-size` | `<length>` | `0.75rem` |
| `--instui-component-text-legend-font-weight` | `<integer>` | `400` |
| `--instui-component-text-legend-line-height` | `<percentage>` | `150%` |
| `--instui-component-text-muted-color` | `<color>` | `light-dark(#576773, #AAB0B5)` |
| `--instui-component-text-muted-on-color` | `<color>` | `#ffffff` |
| `--instui-component-text-primary-color` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-text-success-color` | `<color>` | `light-dark(#037D37, #61C378)` |
| `--instui-component-text-warning-color` | `<color>` | `light-dark(#BB4200, #FF905A)` |

## Relacionat

- [heading](/ca/api/css/heading.md) — Tipografia per a encapçalaments en lloc de text del cos.
- [truncate](/ca/api/css/truncate.md) — Talla aquest text a una línia o a un nombre establert de línies.

