# CSS: button

`.instui-button` — Un control d'acció accessible, estilitzat a partir de la paleta de tokens; principal per defecte.

Les variants de l'IA superposen dos gradients — un farciment de la zona de farciment i un traç de la zona de vora — per al seu marc, i `-color-ai-secondary` no pot pintar text de degradat i farciment simultàniament, per la qual cosa el seu centre es manté transparent en repòs i s'omple al passar per sobre o quan està actiu. Els estils fantasma al passar per sobre i quan està actiu deriven d'una rentada de marca de baixa opacitat, lleugerament enfosquida, en lloc d'utilitzar els tokens de fons de pas en brut, que imprimirien text del mateix color sobre el mateix color. Així mateix estableix el seu propi `gap` d'icona/etiqueta i `padding` horitzontal; encadenar un modificador d'utilitat d'espaiat `-gap-*`/`-p-*`/`-padding-*` anul·la aquests valors integrats.

**Font:** [button.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/button/button.css)

## Accessibilitat

Controleu l'estat premut de la variant `-toggle` amb `aria-pressed`, i marqueu un botó deshabilitat amb `aria-disabled` (o el natiu `disabled`).

## Ús

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/button.css";
```

## Demo

```demo
self:button
```

## Exemples

```html
<button class="instui-button">Primary</button>
<button class="instui-button -color-secondary">Secondary</button>
```

## Modificadors

| Modificador | Descripció |
| --- | --- |
| `.-color-ai` | Una acció d'IA. |
| `.-color-ai-secondary` | Una acció d'IA de menor èmfasi. |
| `.-color-danger` | Una acció destructiva. |
| `.-color-primary` | (per defecte) l'acció principal. |
| `.-color-primary-inverse` | <span class="instui-pill -color-danger pantoken-doc-tag">Deprecat</span> — use `.-on-color`. |
| `.-color-secondary` | Una acció secundària de menor èmfasi. |
| `.-color-success` | Una acció positiva/confirmadora. |
| `.-color-tertiary` | Una acció d'estil de text (sense farciment ni vora fins al pas). |
| `.-condensed` | Farciment més estret per a barres d'eines denses. |
| `.-display-block` | Botó de bloc d'amplada completa. |
| `.-ghost` | Estil de contorn (fantasma): una vora en els tokens fantasma del color, sense farciment. |
| `.-icon-*` | Representeu un glyf del conjunt d'icones abans de l'etiqueta (per exemple, `-icon-arrow-right`), pintat en el color del text del botó; emparellat amb `-shape-square`/`-shape-circle` per a un botó només d'icona. |
| `.-on-color` | For a button placed on a coloured (non-neutral) surface. Composed with `-color-primary` (default) fills white with dark text; composed with `-color-secondary` stays transparent with a white border and text. |
| `.-shape-circle` | Un botó d'icona rodó. |
| `.-shape-square` | Un botó d'icona quadrat. |
| `.-size-large` | Gran. Àlias de forma llarga de `-size-lg`. |
| `.-size-lg` | Gran. |
| `.-size-md` | (per defecte) mida mitjana. |
| `.-size-medium` | (per defecte) mida mitjana. Àlies de forma llarga de `-size-md`. |
| `.-size-sm` | Petit. |
| `.-size-small` | Petit. Àlias de forma llarga de `-size-sm`. |
| `.-toggle` | Un botó de commutació d'estat premut (controlat amb aria-pressed). |
| `.-without-background` | Suprimiu el farciment (fantasma). |
| `.-without-border` | Suprimiu la vora. |

## Pseudoelements

| Pseudoelement | Descripció |
| --- | --- |
| `::after` | L'anell de vora de degradat secundari d'IA, emmascarada només al marc del botó. |
| `::before` | El glyf de l'IA, afegit automàticament als botons d'IA i emmascarad en el color propi de la variant. |

## Estats

| Estat | Descripció |
| --- | --- |
| `[aria-disabled="true"]` | — |
| `[aria-pressed="true"]` | — |
| `:disabled` | — |
| `:state(pressed)` | — |

## Tokens consumits

| Token | Tipus | Valor |
| --- | --- | --- |
| `--instui-border-width-md` | `<length>` | `0.125rem` |
| `--instui-border-width-sm` | `<length>` | `0.0625rem` |
| `--instui-color-background-interactive-action-ai-bottom-gradient-active` | `<color>` | `#01626E` |
| `--instui-color-background-interactive-action-ai-bottom-gradient-base` | `<color>` | `#027887` |
| `--instui-color-background-interactive-action-ai-bottom-gradient-hover` | `<color>` | `#00828E` |
| `--instui-color-background-interactive-action-ai-secondary-active-bottom-gradient` | `<color>` | `light-dark(#CFF0F6, #00424A)` |
| `--instui-color-background-interactive-action-ai-secondary-active-top-gradient` | `<color>` | `light-dark(#F3E5F7, #522965)` |
| `--instui-color-background-interactive-action-ai-secondary-hover-bottom-gradient` | `<color>` | `light-dark(#CFF0F6, #00424A)` |
| `--instui-color-background-interactive-action-ai-secondary-hover-top-gradient` | `<color>` | `light-dark(#F3E5F7, #522965)` |
| `--instui-color-background-interactive-action-ai-top-gradient-active` | `<color>` | `#793F93` |
| `--instui-color-background-interactive-action-ai-top-gradient-base` | `<color>` | `#944FB3` |
| `--instui-color-background-interactive-action-ai-top-gradient-hover` | `<color>` | `#9E58BD` |
| `--instui-color-background-interactive-action-destructive-active` | `<color>` | `#AE161B` |
| `--instui-color-background-interactive-action-destructive-base` | `<color>` | `#CF1F24` |
| `--instui-color-background-interactive-action-destructive-hover` | `<color>` | `#E62429` |
| `--instui-color-background-interactive-action-primary-active` | `<color>` | `light-dark(#061C30, #D5E2F6)` |
| `--instui-color-background-interactive-action-primary-base` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-color-background-interactive-action-primary-disabled` | `<color>` | `light-dark(#DFE1E3, #334450)` |
| `--instui-color-background-interactive-action-primary-hover` | `<color>` | `light-dark(#234465, #ffffff)` |
| `--instui-color-background-interactive-action-primary-on-color-active` | `<color>` | `#B6CCEA` |
| `--instui-color-background-interactive-action-primary-on-color-base` | `<color>` | `#ffffff` |
| `--instui-color-background-interactive-action-primary-on-color-disabled` | `<color>` | `#8D959F` |
| `--instui-color-background-interactive-action-primary-on-color-hover` | `<color>` | `#D5E2F6` |
| `--instui-color-background-interactive-action-secondary-active` | `<color>` | `light-dark(#44709F, #2E5177)` |
| `--instui-color-background-interactive-action-secondary-base` | `<color>` | `light-dark(#44709F, #345B84)` |
| `--instui-color-background-interactive-action-secondary-hover` | `<color>` | `light-dark(#44709F, #3E6895)` |
| `--instui-color-background-interactive-action-success-base` | `<color>` | `#037D37` |
| `--instui-color-background-interactive-action-success-hover` | `<color>` | `#03893D` |
| `--instui-color-background-interactive-action-tertiary-active` | `<color>` | `light-dark(#E2EAF7, #234465)` |
| `--instui-color-background-interactive-action-tertiary-hover` | `<color>` | `light-dark(#EEF4FD, #2E5177)` |
| `--instui-color-background-muted` | `<color>` | `light-dark(#F2F4F5, #273540)` |
| `--instui-color-stroke-interactive-action-ai-bottom-gradient-active` | `<color>` | `light-dark(#01626E, #02717E)` |
| `--instui-color-stroke-interactive-action-ai-bottom-gradient-base` | `<color>` | `#027887` |
| `--instui-color-stroke-interactive-action-ai-bottom-gradient-hover` | `<color>` | `#00828E` |
| `--instui-color-stroke-interactive-action-ai-top-gradient-active` | `<color>` | `light-dark(#793F93, #8A49A7)` |
| `--instui-color-stroke-interactive-action-ai-top-gradient-base` | `<color>` | `#944FB3` |
| `--instui-color-stroke-interactive-action-ai-top-gradient-hover` | `<color>` | `#9E58BD` |
| `--instui-color-stroke-interactive-action-primary-active` | `<color>` | `light-dark(#061C30, #D5E2F6)` |
| `--instui-color-stroke-interactive-action-primary-base` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-color-stroke-interactive-action-primary-hover` | `<color>` | `light-dark(#234465, #ffffff)` |
| `--instui-color-stroke-interactive-action-primary-on-color-active` | `<color>` | `#B6CCEA` |
| `--instui-color-stroke-interactive-action-primary-on-color-base` | `<color>` | `#ffffff` |
| `--instui-color-stroke-interactive-action-primary-on-color-disabled` | `<color>` | `#8D959F` |
| `--instui-color-stroke-interactive-action-primary-on-color-hover` | `<color>` | `#D5E2F6` |
| `--instui-color-stroke-interactive-action-secondary-active` | `<color>` | `light-dark(#44709F, #2E5177)` |
| `--instui-color-stroke-interactive-action-secondary-base` | `<color>` | `light-dark(#44709F, #345B84)` |
| `--instui-color-stroke-interactive-action-secondary-hover` | `<color>` | `light-dark(#44709F, #3E6895)` |
| `--instui-color-stroke-interactive-action-secondary-on-color-active` | `<color>` | `#B6CCEA` |
| `--instui-color-stroke-interactive-action-secondary-on-color-base` | `<color>` | `#ffffff` |
| `--instui-color-stroke-interactive-action-secondary-on-color-disabled` | `<color>` | `#8D959F` |
| `--instui-color-stroke-interactive-action-secondary-on-color-hover` | `<color>` | `#D5E2F6` |
| `--instui-color-stroke-interactive-action-tertiary-base` | `<color>` | `light-dark(#86A8D5, #7097C7)` |
| `--instui-color-text-interactive-action-ai-active` | `<color>` | `#ffffff` |
| `--instui-color-text-interactive-action-ai-base` | `<color>` | `#ffffff` |
| `--instui-color-text-interactive-action-ai-hover` | `<color>` | `#ffffff` |
| `--instui-color-text-interactive-action-ai-secondary-bottom-gradient-base` | `<color>` | `light-dark(#027887, #3CC0D4)` |
| `--instui-color-text-interactive-action-ai-secondary-top-gradient-base` | `<color>` | `light-dark(#944FB3, #CAA1D9)` |
| `--instui-color-text-interactive-action-primary-base` | `<color>` | `light-dark(#ffffff, #1D354F)` |
| `--instui-color-text-interactive-action-primary-disabled` | `<color>` | `light-dark(#9EA6AD, #6A7883)` |
| `--instui-color-text-interactive-action-primary-on-color-active` | `<color>` | `#213D5B` |
| `--instui-color-text-interactive-action-primary-on-color-base` | `<color>` | `#213D5B` |
| `--instui-color-text-interactive-action-primary-on-color-disabled` | `<color>` | `#4A5B68` |
| `--instui-color-text-interactive-action-primary-on-color-hover` | `<color>` | `#213D5B` |
| `--instui-color-text-interactive-action-secondary-base` | `<color>` | `light-dark(#1D354F, #ffffff)` |
| `--instui-color-text-interactive-action-secondary-on-color-active` | `<color>` | `#ffffff` |
| `--instui-color-text-interactive-action-secondary-on-color-base` | `<color>` | `#ffffff` |
| `--instui-color-text-interactive-action-secondary-on-color-disabled` | `<color>` | `#9EA6AD` |
| `--instui-color-text-interactive-action-secondary-on-color-hover` | `<color>` | `#ffffff` |
| `--instui-color-text-interactive-action-status-base` | `<color>` | `#ffffff` |
| `--instui-color-text-interactive-action-tertiary-base` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-base-button-border-radius` | `<length>` | `0.75rem` |
| `--instui-component-base-button-large-font-size` | `<length>` | `1.125rem` |
| `--instui-component-base-button-large-height` | `<length>` | `3rem` |
| `--instui-component-base-button-large-padding-horizontal` | `<length>` | `1.25rem` |
| `--instui-component-base-button-medium-font-size` | `<length>` | `1rem` |
| `--instui-component-base-button-medium-height` | `<length>` | `2.5rem` |
| `--instui-component-base-button-medium-padding-horizontal` | `<length>` | `1rem` |
| `--instui-component-base-button-primary-ghost-background` | `<color>` | `transparent` |
| `--instui-component-base-button-primary-ghost-border-color` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-base-button-primary-ghost-color` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-base-button-primary-inverse-active-background` | `<color>` | `#B6CCEA` |
| `--instui-component-base-button-primary-inverse-background` | `<color>` | `#ffffff` |
| `--instui-component-base-button-primary-inverse-border-color` | `<color>` | `#ffffff` |
| `--instui-component-base-button-primary-inverse-color` | `<color>` | `#213D5B` |
| `--instui-component-base-button-primary-inverse-hover-background` | `<color>` | `#D5E2F6` |
| `--instui-component-base-button-primary-on-color-active-border-color` | `<color>` | `#B6CCEA` |
| `--instui-component-base-button-primary-on-color-hover-border-color` | `<color>` | `#D5E2F6` |
| `--instui-component-base-button-secondary-ghost-background` | `<color>` | `transparent` |
| `--instui-component-base-button-secondary-ghost-border-color` | `<color>` | `light-dark(#1D354F, #ffffff)` |
| `--instui-component-base-button-secondary-ghost-color` | `<color>` | `light-dark(#1D354F, #ffffff)` |
| `--instui-component-base-button-small-font-size` | `<length>` | `0.875rem` |
| `--instui-component-base-button-small-height` | `<length>` | `2rem` |
| `--instui-component-base-button-small-padding-horizontal` | `<length>` | `0.75rem` |
| `--instui-font-family-base` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-font-weight-interactive` | `<integer>` | `500` |
| `--instui-line-height-standalone-text-base` | `<length>` | `1rem` |
| `--instui-spacing-space-xs` | `<length>` | `0.25rem` |

## Relacionat

- [close-button](/ca/api/css/close-button.md) — El botó de desestimar només amb icona.

