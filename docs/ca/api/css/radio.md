# CSS: radio

`.instui-radio` — Un botó de ràdio natiu i la seva etiqueta.

Estableix el seu propi `gap` entre el control i la seva etiqueta; encadenar un modificador d'utilitat d'espaçament `-gap-*` substitueix aquest valor integrat.

**Font:** [radio.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/radio/radio.css)

## Accessibilitat

Un `<input type="radio">` natiu controla `:checked` i `:disabled`; `-readonly` és només estil, ja que els ràdios no tenen un atribut natiu de només lectura.

## Ús

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/radio.css";
```

## Exemples

```html
<label class="instui-radio"><input type="radio" name="r" checked> Option A</label>
```

## Modificadors

| Modificador | Descripció |
| --- | --- |
| `.-context-danger` | Color de context de perill (variant de commutador). |
| `.-context-off` | Color de context apagat/neutre (variant de commutador). |
| `.-context-success` | Color de context d'èxit (variant de commutador). |
| `.-context-warning` | Color de context d'advertència (variant de commutador). |
| `.-readonly` | Estat de només lectura. |
| `.-size-large` | Gran. Àlias de forma llarga de `-size-lg`. |
| `.-size-lg` | Gran. |
| `.-size-sm` | Petit. |
| `.-size-small` | Petit. Àlias de forma llarga de `-size-sm`. |
| `.-toggle` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-variant-toggle`. |
| `.-variant-toggle` | Renderitzar com a botó de commutació segmentat. |

## Pseudoelements

| Pseudoelement | Descripció |
| --- | --- |
| `::before` | El punt interior ple que es mostra quan està marcat; en `-variant-toggle` és l'anell de focus dibuixat just fora de la píndola. |

## Estats

| Estat | Descripció |
| --- | --- |
| `:checked` | — |
| `:disabled` | — |

## Propietats personalitzades

| Propietat | Tipus | Predeterminat | Descripció |
| --- | --- | --- | --- |
| `--pantoken-rt-fill` | `<color>` | — | Color de farciment seleccionat del commutador; els modificadors -context-* ho estableixen. |

## Tokens consumits

| Token | Tipus | Valor |
| --- | --- | --- |
| `--instui-component-radio-input-background-color` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-radio-input-background-disabled-color` | `<color>` | `light-dark(#E8EAEC, #334450)` |
| `--instui-component-radio-input-background-hover-color` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-radio-input-background-readonly-color` | `<color>` | `light-dark(#C7CACD, #6A7883)` |
| `--instui-component-radio-input-border-color` | `<color>` | `light-dark(#7E8792, #5F6E7A)` |
| `--instui-component-radio-input-border-disabled-color` | `<color>` | `light-dark(#C7CACD, #4A5B68)` |
| `--instui-component-radio-input-border-hover-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-radio-input-border-readonly-color` | `<color>` | `#8D959F` |
| `--instui-component-radio-input-border-selected-color` | `<color>` | `light-dark(#1C222B, #ffffff)` |
| `--instui-component-radio-input-border-width` | `<length>` | `0.0625rem` |
| `--instui-component-radio-input-checked-inset-lg` | `<length>` | `0.375rem` |
| `--instui-component-radio-input-checked-inset-md` | `<length>` | `0.375rem` |
| `--instui-component-radio-input-checked-inset-sm` | `<length>` | `0.375rem` |
| `--instui-component-radio-input-control-size-lg` | `<length>` | `1.5rem` |
| `--instui-component-radio-input-control-size-md` | `<length>` | `1.5rem` |
| `--instui-component-radio-input-control-size-sm` | `<length>` | `1.5rem` |
| `--instui-component-radio-input-control-vertical-margin` | `<length>` | `0rem` |
| `--instui-component-radio-input-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-radio-input-font-size-lg` | `<length>` | `1.25rem` |
| `--instui-component-radio-input-font-size-md` | `<length>` | `1rem` |
| `--instui-component-radio-input-font-size-sm` | `<length>` | `0.875rem` |
| `--instui-component-radio-input-font-weight` | `<integer>` | `400` |
| `--instui-component-radio-input-gap` | `<length>` | `0.5rem` |
| `--instui-component-radio-input-label-base-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-radio-input-label-disabled-color` | `<color>` | `light-dark(#8D959F, #576773)` |
| `--instui-component-radio-input-label-hover-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-radio-input-label-readonly-color` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-radio-input-line-height-lg` | `<length>` | `1.5rem` |
| `--instui-component-radio-input-line-height-md` | `<length>` | `1.5rem` |
| `--instui-component-radio-input-line-height-sm` | `<length>` | `1.25rem` |
| `--instui-component-radio-input-toggle-background-danger` | `<color>` | `#CF4A00` |
| `--instui-component-radio-input-toggle-background-off` | `<color>` | `#03893D` |
| `--instui-component-radio-input-toggle-background-success` | `<color>` | `#03893D` |
| `--instui-component-radio-input-toggle-background-warning` | `<color>` | `#CF4A00` |
| `--instui-component-radio-input-toggle-border-radius` | `<length>` | `0.25rem` |
| `--instui-component-radio-input-toggle-handle-text` | `<color>` | `#ffffff` |
| `--instui-component-radio-input-toggle-large-font-size` | `<length>` | `1rem` |
| `--instui-component-radio-input-toggle-large-height` | `<length>` | `3rem` |
| `--instui-component-radio-input-toggle-medium-font-size` | `<length>` | `0.875rem` |
| `--instui-component-radio-input-toggle-medium-height` | `<length>` | `2.5rem` |
| `--instui-component-radio-input-toggle-small-font-size` | `<length>` | `0.75rem` |
| `--instui-component-radio-input-toggle-small-height` | `<length>` | `2rem` |
| `--instui-elevation-depth1` | `none \| <shadow>#` | — |
| `--instui-focus-outline-color` | `auto \| <color>` | — |
| `--instui-focus-outline-style` | `auto \| <outline-line-style>` | — |
| `--instui-focus-outline-width` | `<line-width>` | — |

## Relacionat

- [checkbox](/ca/api/css/checkbox.md) — La contrapart de multi-selecció a un ràdio de selecció única.
- [radio-input-group](/ca/api/css/radio-input-group.md) — Recull radios en un conjunt de camps de selecció única.

