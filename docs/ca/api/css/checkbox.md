# CSS: checkbox

`.instui-checkbox` — Una casella de verificació nativa i la seva etiqueta, o un commutador via `-variant-toggle`.

Establiu `el.indeterminate = true` a JavaScript per mostrar el guió d'estat mixt; la marca verificada contrasta automàticament amb l'ompliment — blanc sobre un ompliment fosc, gairebé negre sobre un clar. També estableix el seu propi `gap` entre el control i la seva etiqueta; encadenar un modificador d'utilitat d'espaiat `-gap-*` substitueix aquest valor integrat.

**Font:** [checkbox.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/checkbox/checkbox.css)

## Accessibilitat

Un `<input type="checkbox">` natiu impulsa `:checked`, `:indeterminate` i `:disabled`; establiu `el.indeterminate = true` a JavaScript per a l'estat mixt, i tingueu en compte que `-readonly` és només estil ja que les caselles de verificació no tenen un atribut readonly natiu.

## Ús

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/checkbox.css";
```

## Exemples

```html
<label class="instui-checkbox --display-block --mb-sm">
  <input type="checkbox" checked>Checkbox
</label>
<label class="instui-checkbox -variant-toggle">
  <input type="checkbox">Toggle
</label>
```

## Modificadors

| Modificador | Descripció |
| --- | --- |
| `.-invalid` | Estat no vàlid (error). |
| `.-label-placement-end` | Col·loqueu l'etiqueta després del control. |
| `.-label-placement-start` | Col·loqueu l'etiqueta abans del control. |
| `.-label-placement-top` | Col·loqueu l'etiqueta per sobre del control. |
| `.-readonly` | Estat de només lectura. |
| `.-required` | Mostreu l'asterisc del camp requerit al costat de l'etiqueta. |
| `.-size-large` | Gran. Àlias de forma llarga de `-size-lg`. |
| `.-size-lg` | Gran. |
| `.-size-sm` | Petit. |
| `.-size-small` | Petit. Àlias de forma llarga de `-size-sm`. |
| `.-variant-toggle` | Renderitzar com a commutador en lloc de caixa. |

## Parts

| Part | Descripció |
| --- | --- |
| `.asterisk` | L'asterisc del camp requerit. |

## Pseudoelements

| Pseudoelement | Descripció |
| --- | --- |
| `::after` | A `-variant-toggle`, el glif d'estat sobre el mànec: una X quan està apagat, una marca quan està encès. |
| `::before` | El glif de marca o guió enmascarats centrats a la caixa; a `-variant-toggle` es converteix en el mànec lliscant. |

## Estats

| Estat | Descripció |
| --- | --- |
| `:checked` | — |
| `:disabled` | — |
| `:indeterminate` | — |

## Propietats personalitzades

| Propietat | Tipus | Predeterminat | Descripció |
| --- | --- | --- | --- |
| `--pantoken-cb-glyph` | `<url>` | — | El glif de màscara de la caixa: una marca quan està marcada, un guió quan és indeterminat. |
| `--pantoken-toggle-bw` | `<length>` | — | L'amplada del límit del commutador. |
| `--pantoken-toggle-h` | `<length>` | — | L'altura del commutador. |
| `--pantoken-toggle-handle` | `<length>` | — | El diàmetre del mànec calculat. |
| `--pantoken-toggle-inset` | `<length>` | — | La insercció del mànec des de cada vora de la pista. |
| `--pantoken-toggle-w` | `<length>` | — | L'amplada de la pista del commutador. |

## Tokens consumits

| Token | Tipus | Valor |
| --- | --- | --- |
| `--instui-border-width-sm` | `<length>` | `0.0625rem` |
| `--instui-color-background-muted` | `<color>` | `light-dark(#F2F4F5, #273540)` |
| `--instui-color-stroke-base` | `<color>` | `light-dark(#8D959F, #6A7883)` |
| `--instui-color-text-muted` | `<color>` | `light-dark(#576773, #AAB0B5)` |
| `--instui-component-checkbox-asterisk-color` | `<color>` | `light-dark(#CF1F24, #FA917F)` |
| `--instui-component-checkbox-background-checked-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-checkbox-background-color` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-checkbox-background-disabled-color` | `<color>` | `light-dark(#E8EAEC, #334450)` |
| `--instui-component-checkbox-background-hover-color` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-checkbox-background-readonly-color` | `<color>` | `light-dark(#C7CACD, #6A7883)` |
| `--instui-component-checkbox-border-checked-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-checkbox-border-color` | `<color>` | `light-dark(#7E8792, #5F6E7A)` |
| `--instui-component-checkbox-border-disabled-color` | `<color>` | `light-dark(#C7CACD, #4A5B68)` |
| `--instui-component-checkbox-border-hover-color` | `<color>` | `light-dark(#334450, #7E8792)` |
| `--instui-component-checkbox-border-radius` | `<length>` | `0.25rem` |
| `--instui-component-checkbox-border-readonly-color` | `<color>` | `#8D959F` |
| `--instui-component-checkbox-border-width` | `<length>` | `0.0625rem` |
| `--instui-component-checkbox-control-size-lg` | `<length>` | `1.5rem` |
| `--instui-component-checkbox-control-size-md` | `<length>` | `1.5rem` |
| `--instui-component-checkbox-control-size-sm` | `<length>` | `1.5rem` |
| `--instui-component-checkbox-control-vertical-margin` | `<length>` | `0rem` |
| `--instui-component-checkbox-error-border-color` | `<color>` | `light-dark(#CF1F24, #F56050)` |
| `--instui-component-checkbox-error-border-hover-color` | `<color>` | `light-dark(#CF1F24, #FE7D6A)` |
| `--instui-component-checkbox-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-checkbox-font-size-lg` | `<length>` | `1.25rem` |
| `--instui-component-checkbox-font-size-md` | `<length>` | `1rem` |
| `--instui-component-checkbox-font-size-sm` | `<length>` | `0.875rem` |
| `--instui-component-checkbox-font-weight` | `<integer>` | `400` |
| `--instui-component-checkbox-gap` | `<length>` | `0.5rem` |
| `--instui-component-checkbox-label-base-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-checkbox-label-disabled-color` | `<color>` | `light-dark(#8D959F, #576773)` |
| `--instui-component-checkbox-label-hover-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-checkbox-label-readonly-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-checkbox-line-height` | `<percentage>` | `125%` |
| `--instui-component-radio-input-toggle-background-success` | `<color>` | `#03893D` |
| `--instui-component-radio-input-toggle-handle-text` | `<color>` | `#ffffff` |
| `--instui-component-radio-input-toggle-medium-height` | `<length>` | `2.5rem` |
| `--instui-icon-check` | `<image>` | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M20%206%209%2017l-5-5%22%2F%3E%3C%2Fsvg%3E')` |
| `--instui-icon-minus` | `<image>` | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M5%2012h14%22%2F%3E%3C%2Fsvg%3E')` |
| `--instui-icon-x` | `<image>` | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M18%206%206%2018%22%2F%3E%3Cpath%20d%3D%22m6%206%2012%2012%22%2F%3E%3C%2Fsvg%3E')` |
| `--instui-size-choice-control-height-md` | `<length>` | `1.5rem` |

## Relacionat

- [radio](/ca/api/css/radio.md) — L'homòleg de selecció única.

