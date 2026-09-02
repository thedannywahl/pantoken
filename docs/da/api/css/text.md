# CSS: text

`.instui-text` · <span class="instui-pill -color-success pantoken-doc-tag">stable</span> — Brødtekstypografi med størrelse, vægt, farve og stilmodifikatorer.

De `-variant-*` præindstillinger og `-color-*`/`-size-*`/`-weight-*` modifikatorer komponeres alle på det samme element; i modsætning til `heading` gengiver det ikke noget implicit semantisk niveau.

**Kilde:** [text.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/text/text.css)

## Brug

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/text.css";
```

## Eksempler

```html
<span class="instui-text -size-xs --display-block">x-small text</span>
<span class="instui-text -size-sm --display-block">small text</span>
<span class="instui-text -variant-content-quote --display-block">Quoted text</span>
<span class="instui-text -color-ai-highlight">AI highlight text</span>
```

## Modifikatorer

| Modifikator | Beskrivelse |
| --- | --- |
| `.-color-ai` | <span class="instui-pill -color-danger pantoken-doc-tag">Udløbet</span> — use `.-color-ai-highlight`. |
| `.-color-ai-highlight` | AI-accent tekstfarve med baggrundsfremhævning. |
| `.-color-brand` | Brand tekstfarve. |
| `.-color-danger` | Fare tekstfarve. |
| `.-color-primary` | Primær tekstfarve. |
| `.-color-primary-inverse` | On-dark (primær inverse) tekstfarve. |
| `.-color-primary-on` | Primær tekstfarve på en farvet baggrund. |
| `.-color-secondary` | Sekundær (dæmpet) tekstfarve. |
| `.-color-secondary-inverse` | On-dark (sekundær inverse) tekstfarve. |
| `.-color-secondary-on` | Sekundær tekstfarve på en farvet baggrund. |
| `.-color-success` | Succes tekstfarve. |
| `.-color-warning` | Advarsel tekstfarve. |
| `.-size-large` | Stor. Langt-form alias af `-size-lg`. |
| `.-size-lg` | Stor. |
| `.-size-sm` | Lille. |
| `.-size-small` | Lille. Langt-form alias af `-size-sm`. |
| `.-size-x-large` | Ekstra stor. Langt-form alias af `-size-xl`. |
| `.-size-x-small` | Ekstra lille. Langt-form alias af `-size-xs`. |
| `.-size-xl` | Ekstra stor. |
| `.-size-xs` | Ekstra lille. |
| `.-style-italic` | Kursiv. |
| `.-transform-capitalize` | Kapitalisér hvert ord. |
| `.-transform-lowercase` | Gør teksten til små bogstaver. |
| `.-transform-uppercase` | Gør teksten til store bogstaver. |
| `.-variant-content` | Indholdstype præindstilling. |
| `.-variant-content-important` | Vigtig-indholdstype præindstilling. |
| `.-variant-content-quote` | Citat-indholdstype præindstilling. |
| `.-variant-content-small` | Small-content type preset. |
| `.-variant-description-page` | Side-beskrivelse type præindstilling. |
| `.-variant-description-section` | Sektion-beskrivelse type præindstilling. |
| `.-variant-legend` | Legend type præindstilling. |
| `.-weight-bold` | Fed vægt. |

## Forbrugte tokens

| Token | Type | Værdi |
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

## Relateret

- [heading](/da/api/css/heading.md) — Typografi for overskrifter snarere end brødtekst.
- [truncate](/da/api/css/truncate.md) — Klippes denne tekst til én linje eller et bestemt antal linjer.

