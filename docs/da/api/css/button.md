# CSS: button

`.instui-button` — Et tilgængeligt handlingskontrol, udformet fra tokenpaletten; primær som standard.

AI-varianterne lagdeler to gradienter — en padding-box-udfyldning og en border-box-streg — for deres ramme, og `-color-ai-secondary` kan ikke male gradienttekst og en udfyldning på én gang, så dets centrum forbliver transparent i hvile og udfylder ved hover eller aktiv. Ghost hover og aktiv udleder en lav-opacitet, let-mørkere brand-vask i stedet for at bruge de rå hover-background-tokens, som ville udskrive samme-farve-på-samme-farve-tekst. Sætter også sit eget ikon/etiket `gap` og horisontalt `padding`; kæde af en `-gap-*`/`-p-*`/`-padding-*` spacing utility-modifikator tilsidesætter disse indbyggede værdier.

**Kilde:** [button.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/button/button.css)

## Accessibility

Drev `-toggle`-variantens trykket tilstand med `aria-pressed`, og marker en deaktiveret knap med `aria-disabled` (eller den native `disabled`).

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/button.css";
```

## Demo

```demo
self:button
```

## Examples

```html
<button class="instui-button">Primary</button>
<button class="instui-button -color-secondary">Secondary</button>
```

## Modifiers

| Modifier                  | Description                                                                                                                                                             |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.-color-ai`              | En AI-handling.                                                                                                                                                         |
| `.-color-ai-secondary`    | En lavere-vægt AI-handling.                                                                                                                                             |
| `.-color-danger`          | En destruktiv handling.                                                                                                                                                 |
| `.-color-primary`         | (standard) den primære handling.                                                                                                                                        |
| `.-color-primary-inverse` | Primær handling for mørke baggrunde.                                                                                                                                    |
| `.-color-secondary`       | En lavere-vægt sekundær handling.                                                                                                                                       |
| `.-color-success`         | En positiv/bekræftende handling.                                                                                                                                        |
| `.-color-tertiary`        | En tekst-stil handling (ingen udfyldning eller kant før hover).                                                                                                         |
| `.-condensed`             | Strammere padding til tætte værktøjslinjer.                                                                                                                             |
| `.-display-block`         | Fuldbredde blok knap.                                                                                                                                                   |
| `.-ghost`                 | Outline (ghost) stil: en kant i farveens ghost-tokens, ingen udfyldning.                                                                                                |
| `.-icon-*`                | Gengiv en glyf fra ikonsættet før etiketten (f.eks. `-icon-arrow-right`), malet i knappens tekstfarve; parvel med `-shape-square`/`-shape-circle` til en kun-ikon knap. |
| `.-shape-circle`          | En rund ikon knap.                                                                                                                                                      |
| `.-shape-square`          | En kvadratisk ikon knap.                                                                                                                                                |
| `.-size-large`            | Stor. Langt-form alias af `-size-lg`.                                                                                                                                   |
| `.-size-lg`               | Stor.                                                                                                                                                                   |
| `.-size-md`               | (standard) medium størrelse.                                                                                                                                            |
| `.-size-medium`           | (standard) medium størrelse. Lang form alias af `-size-md`.                                                                                                             |
| `.-size-sm`               | Lille.                                                                                                                                                                  |
| `.-size-small`            | Lille. Langt-form alias af `-size-sm`.                                                                                                                                  |
| `.-toggle`                | En trykket-tilstand toggle-knap (drev med aria-pressed).                                                                                                                |
| `.-without-background`    | Slip udfyldningen (ghost).                                                                                                                                              |
| `.-without-border`        | Fjern kanten.                                                                                                                                                           |

## Pseudo-elements

| Pseudo-element | Description                                                                        |
| -------------- | ---------------------------------------------------------------------------------- |
| `::after`      | Den AI-sekundære gradient kant ring, maskeret til bare knappens ramme.             |
| `::before`     | AI-glyfen, tilføjet automatisk til AI-knapper og maskeret i variantens egen farve. |

## States

| State                    | Description |
| ------------------------ | ----------- |
| `[aria-disabled="true"]` | —           |
| `[aria-pressed="true"]`  | —           |
| `:disabled`              | —           |
| `:state(pressed)`        | —           |

## Tokens consumed

| Token                                                                              | Type                                               | Value                                                                        |
| ---------------------------------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| `--instui-border-width-md`                                                         | `<length>`                                         | `0.125rem`                                                                   |
| `--instui-border-width-sm`                                                         | `<length>`                                         | `0.0625rem`                                                                  |
| `--instui-color-background-interactive-action-ai-bottom-gradient-active`           | `<color>`                                          | `#01626E`                                                                    |
| `--instui-color-background-interactive-action-ai-bottom-gradient-base`             | `<color>`                                          | `#027887`                                                                    |
| `--instui-color-background-interactive-action-ai-bottom-gradient-hover`            | `<color>`                                          | `#00828E`                                                                    |
| `--instui-color-background-interactive-action-ai-secondary-active-bottom-gradient` | `<color>`                                          | `light-dark(#CFF0F6, #00424A)`                                               |
| `--instui-color-background-interactive-action-ai-secondary-active-top-gradient`    | `<color>`                                          | `light-dark(#F3E5F7, #522965)`                                               |
| `--instui-color-background-interactive-action-ai-secondary-hover-bottom-gradient`  | `<color>`                                          | `light-dark(#CFF0F6, #00424A)`                                               |
| `--instui-color-background-interactive-action-ai-secondary-hover-top-gradient`     | `<color>`                                          | `light-dark(#F3E5F7, #522965)`                                               |
| `--instui-color-background-interactive-action-ai-top-gradient-active`              | `<color>`                                          | `#793F93`                                                                    |
| `--instui-color-background-interactive-action-ai-top-gradient-base`                | `<color>`                                          | `#944FB3`                                                                    |
| `--instui-color-background-interactive-action-ai-top-gradient-hover`               | `<color>`                                          | `#9E58BD`                                                                    |
| `--instui-color-background-interactive-action-destructive-active`                  | `<color>`                                          | `#AE161B`                                                                    |
| `--instui-color-background-interactive-action-destructive-base`                    | `<color>`                                          | `#CF1F24`                                                                    |
| `--instui-color-background-interactive-action-destructive-hover`                   | `<color>`                                          | `#E62429`                                                                    |
| `--instui-color-background-interactive-action-primary-active`                      | `<color>`                                          | `light-dark(#061C30, #D5E2F6)`                                               |
| `--instui-color-background-interactive-action-primary-base`                        | `<color>`                                          | `light-dark(#1D354F, #EEF4FD)`                                               |
| `--instui-color-background-interactive-action-primary-disabled`                    | `<color>`                                          | `light-dark(#DFE1E3, #334450)`                                               |
| `--instui-color-background-interactive-action-primary-hover`                       | `<color>`                                          | `light-dark(#234465, #ffffff)`                                               |
| `--instui-color-background-interactive-action-secondary-active`                    | `<color>`                                          | `light-dark(#44709F, #2E5177)`                                               |
| `--instui-color-background-interactive-action-secondary-base`                      | `<color>`                                          | `light-dark(#44709F, #345B84)`                                               |
| `--instui-color-background-interactive-action-secondary-hover`                     | `<color>`                                          | `light-dark(#44709F, #3E6895)`                                               |
| `--instui-color-background-interactive-action-success-base`                        | `<color>`                                          | `#037D37`                                                                    |
| `--instui-color-background-interactive-action-success-hover`                       | `<color>`                                          | `#03893D`                                                                    |
| `--instui-color-background-interactive-action-tertiary-active`                     | `<color>`                                          | `light-dark(#E2EAF7, #234465)`                                               |
| `--instui-color-background-interactive-action-tertiary-hover`                      | `<color>`                                          | `light-dark(#EEF4FD, #2E5177)`                                               |
| `--instui-color-background-muted`                                                  | `<color>`                                          | `light-dark(#F2F4F5, #273540)`                                               |
| `--instui-color-stroke-interactive-action-ai-bottom-gradient-active`               | `<color>`                                          | `light-dark(#01626E, #02717E)`                                               |
| `--instui-color-stroke-interactive-action-ai-bottom-gradient-base`                 | `<color>`                                          | `#027887`                                                                    |
| `--instui-color-stroke-interactive-action-ai-bottom-gradient-hover`                | `<color>`                                          | `#00828E`                                                                    |
| `--instui-color-stroke-interactive-action-ai-top-gradient-active`                  | `<color>`                                          | `light-dark(#793F93, #8A49A7)`                                               |
| `--instui-color-stroke-interactive-action-ai-top-gradient-base`                    | `<color>`                                          | `#944FB3`                                                                    |
| `--instui-color-stroke-interactive-action-ai-top-gradient-hover`                   | `<color>`                                          | `#9E58BD`                                                                    |
| `--instui-color-stroke-interactive-action-primary-active`                          | `<color>`                                          | `light-dark(#061C30, #D5E2F6)`                                               |
| `--instui-color-stroke-interactive-action-primary-base`                            | `<color>`                                          | `light-dark(#1D354F, #EEF4FD)`                                               |
| `--instui-color-stroke-interactive-action-primary-hover`                           | `<color>`                                          | `light-dark(#234465, #ffffff)`                                               |
| `--instui-color-stroke-interactive-action-secondary-active`                        | `<color>`                                          | `light-dark(#44709F, #2E5177)`                                               |
| `--instui-color-stroke-interactive-action-secondary-base`                          | `<color>`                                          | `light-dark(#44709F, #345B84)`                                               |
| `--instui-color-stroke-interactive-action-secondary-hover`                         | `<color>`                                          | `light-dark(#44709F, #3E6895)`                                               |
| `--instui-color-stroke-interactive-action-tertiary-base`                           | `<color>`                                          | `light-dark(#86A8D5, #7097C7)`                                               |
| `--instui-color-text-interactive-action-ai-active`                                 | `<color>`                                          | `#ffffff`                                                                    |
| `--instui-color-text-interactive-action-ai-base`                                   | `<color>`                                          | `#ffffff`                                                                    |
| `--instui-color-text-interactive-action-ai-hover`                                  | `<color>`                                          | `#ffffff`                                                                    |
| `--instui-color-text-interactive-action-ai-secondary-bottom-gradient-base`         | `<color>`                                          | `light-dark(#027887, #3CC0D4)`                                               |
| `--instui-color-text-interactive-action-ai-secondary-top-gradient-base`            | `<color>`                                          | `light-dark(#944FB3, #CAA1D9)`                                               |
| `--instui-color-text-interactive-action-primary-base`                              | `<color>`                                          | `light-dark(#ffffff, #1D354F)`                                               |
| `--instui-color-text-interactive-action-primary-disabled`                          | `<color>`                                          | `light-dark(#9EA6AD, #6A7883)`                                               |
| `--instui-color-text-interactive-action-secondary-base`                            | `<color>`                                          | `light-dark(#1D354F, #ffffff)`                                               |
| `--instui-color-text-interactive-action-status-base`                               | `<color>`                                          | `#ffffff`                                                                    |
| `--instui-color-text-interactive-action-tertiary-base`                             | `<color>`                                          | `light-dark(#1D354F, #EEF4FD)`                                               |
| `--instui-component-base-button-border-radius`                                     | `<length>`                                         | `0.75rem`                                                                    |
| `--instui-component-base-button-large-font-size`                                   | `<length>`                                         | `1.125rem`                                                                   |
| `--instui-component-base-button-large-height`                                      | `<length>`                                         | `3rem`                                                                       |
| `--instui-component-base-button-large-padding-horizontal`                          | `<length>`                                         | `1.25rem`                                                                    |
| `--instui-component-base-button-medium-font-size`                                  | `<length>`                                         | `1rem`                                                                       |
| `--instui-component-base-button-medium-height`                                     | `<length>`                                         | `2.5rem`                                                                     |
| `--instui-component-base-button-medium-padding-horizontal`                         | `<length>`                                         | `1rem`                                                                       |
| `--instui-component-base-button-primary-ghost-background`                          | `<color>`                                          | `transparent`                                                                |
| `--instui-component-base-button-primary-ghost-border-color`                        | `<color>`                                          | `light-dark(#1D354F, #EEF4FD)`                                               |
| `--instui-component-base-button-primary-ghost-color`                               | `<color>`                                          | `light-dark(#1D354F, #EEF4FD)`                                               |
| `--instui-component-base-button-primary-inverse-active-background`                 | `<color>`                                          | `#B6CCEA`                                                                    |
| `--instui-component-base-button-primary-inverse-background`                        | `<color>`                                          | `#ffffff`                                                                    |
| `--instui-component-base-button-primary-inverse-border-color`                      | `<color>`                                          | `#ffffff`                                                                    |
| `--instui-component-base-button-primary-inverse-color`                             | `<color>`                                          | `#213D5B`                                                                    |
| `--instui-component-base-button-primary-inverse-hover-background`                  | `<color>`                                          | `#D5E2F6`                                                                    |
| `--instui-component-base-button-primary-on-color-active-border-color`              | `<color>`                                          | `#B6CCEA`                                                                    |
| `--instui-component-base-button-primary-on-color-hover-border-color`               | `<color>`                                          | `#D5E2F6`                                                                    |
| `--instui-component-base-button-secondary-ghost-background`                        | `<color>`                                          | `transparent`                                                                |
| `--instui-component-base-button-secondary-ghost-border-color`                      | `<color>`                                          | `light-dark(#1D354F, #ffffff)`                                               |
| `--instui-component-base-button-secondary-ghost-color`                             | `<color>`                                          | `light-dark(#1D354F, #ffffff)`                                               |
| `--instui-component-base-button-small-font-size`                                   | `<length>`                                         | `0.875rem`                                                                   |
| `--instui-component-base-button-small-height`                                      | `<length>`                                         | `2rem`                                                                       |
| `--instui-component-base-button-small-padding-horizontal`                          | `<length>`                                         | `0.75rem`                                                                    |
| `--instui-font-family-base`                                                        | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-font-weight-interactive`                                                 | `<integer>`                                        | `500`                                                                        |
| `--instui-line-height-standalone-text-base`                                        | `<length>`                                         | `1rem`                                                                       |
| `--instui-spacing-space-xs`                                                        | `<length>`                                         | `0.25rem`                                                                    |

## Related

- [close-button](/da/api/css/close-button.md) — Knappen til kun ikon med afvisning.
