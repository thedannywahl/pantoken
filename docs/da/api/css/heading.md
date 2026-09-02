# CSS: heading

`.instui-heading` — Overskriftstypografi fra `-level-h1` til `-level-h6`.

De `-variant-*` foruddefinerede indstillinger tilsidesætter en `-level-*`'s skriftstørrelse og skriftvægt, så kombinér kun én af hver familie pr. element.

**Kilde:** [heading.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/heading/heading.css)

## Tilgængelighed

Disse klasser angiver kun det visuelle niveau, så render en rigtig `&lt;h1&gt;`–`&lt;h6&gt;` (eller brug `role="heading"` med `aria-level`) for at formidle overskriftsniveauet.

## Brug

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/heading.css";
```

## Eksempler

```html
<div class="instui-heading -level-h1">Heading h1</div>
```

## Modifikatorer

| Modifikator | Beskrivelse |
| --- | --- |
| `.-border-bottom` | Tilføj en bundstreg. |
| `.-border-top` | Tilføj en topstreg. |
| `.-color-ai` | AI-accentfarve. |
| `.-color-primary` | (standard) Primær farve. |
| `.-color-primary-inverse` | Mørk baggrund (primær invers) farve. |
| `.-color-secondary` | Sekundær (dæmpet) farve. |
| `.-level-h1` | Render på h1 typeskala. |
| `.-level-h2` | Render på h2 typeskala. |
| `.-level-h3` | Render på h3 typeskala. |
| `.-level-h4` | Render på h4 typeskala. |
| `.-level-h5` | Render på h5 typeskala. |
| `.-level-h6` | Render på h6 typeskala. |
| `.-variant-label` | Mærketype-foruddefineret. |
| `.-variant-title-card-mini` | Mini kortitel-foruddefineret. |
| `.-variant-title-card-regular` | Almindelig kortitel-foruddefineret. |
| `.-variant-title-card-section` | Kortafsnit-titel-foruddefineret. |
| `.-variant-title-page` | Sidetitel-foruddefineret. |
| `.-variant-title-section` | Afsnitstittel-foruddefineret. |

## Forbrugte tokens

| Token | Type | Værdi |
| --- | --- | --- |
| `--instui-component-heading-ai-text-bottom-gradient-color` | `<color>` | `light-dark(#027887, #3CC0D4)` |
| `--instui-component-heading-ai-text-top-gradient-color` | `<color>` | `light-dark(#944FB3, #CAA1D9)` |
| `--instui-component-heading-base-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-heading-border-color` | `<color>` | `light-dark(#8D959F, #6A7883)` |
| `--instui-component-heading-border-padding` | `<length>` | `0.125rem` |
| `--instui-component-heading-border-width` | `<length>` | `0.0625rem` |
| `--instui-component-heading-h1-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Inclusive Sans, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-heading-h1-font-size` | `<length>` | `2.5rem` |
| `--instui-component-heading-h1-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-h2-font-size` | `<length>` | `1.75rem` |
| `--instui-component-heading-h2-font-weight` | `<integer>` | `600` |
| `--instui-component-heading-h3-font-size` | `<length>` | `1.25rem` |
| `--instui-component-heading-h3-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-h4-font-size` | `<length>` | `1rem` |
| `--instui-component-heading-h4-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-h5-font-size` | `<length>` | `0.875rem` |
| `--instui-component-heading-h5-font-weight` | `<integer>` | `600` |
| `--instui-component-heading-h6-font-size` | `<length>` | `0.75rem` |
| `--instui-component-heading-h6-font-weight` | `<integer>` | `600` |
| `--instui-component-heading-inverse-color` | `<color>` | `light-dark(#ffffff, #1C222B)` |
| `--instui-component-heading-label-font-size` | `<length>` | `1rem` |
| `--instui-component-heading-label-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-line-height` | `<percentage>` | `125%` |
| `--instui-component-heading-muted-color` | `<color>` | `light-dark(#576773, #AAB0B5)` |
| `--instui-component-heading-title-card-mini-font-size` | `<length>` | `1rem` |
| `--instui-component-heading-title-card-mini-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-title-card-regular-font-size` | `<length>` | `1.25rem` |
| `--instui-component-heading-title-card-regular-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-title-card-section-font-size` | `<length>` | `1.75rem` |
| `--instui-component-heading-title-card-section-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-title-page-desktop-font-size` | `<length>` | `2.5rem` |
| `--instui-component-heading-title-page-desktop-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-title-section-font-size` | `<length>` | `1.75rem` |
| `--instui-component-heading-title-section-font-weight` | `<integer>` | `700` |

## Relateret

- [text](/da/api/css/text.md) — Brødtekst-typografi til ikke-overskriftstekst.

