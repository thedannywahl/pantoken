# CSS: checkbox

`.instui-checkbox` — A native checkbox and its label, or a switch via `-variant-toggle`.

Set `el.indeterminate = true` in JavaScript to show the mixed-state dash; the checked tick auto-contrasts against the fill — white on a dark fill, near-black on a light one. Also sets its own `gap` between the control and its label; chaining a `-gap-*` spacing utility modifier overrides that built-in value.

**Source:** [checkbox.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/checkbox/checkbox.css)

## Erişilebilirlik

A native `<input type="checkbox">` drives `:checked`, `:indeterminate`, and `:disabled`; set `el.indeterminate = true` in JavaScript for the mixed state, and note that `-readonly` is styling only since checkboxes have no native readonly attribute.

## Kullanım

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/checkbox.css";
```

## Örnekler

```html
<label class="instui-checkbox --display-block --mb-sm">
  <input type="checkbox" checked>Checkbox
</label>
<label class="instui-checkbox -variant-toggle">
  <input type="checkbox">Toggle
</label>
```

## Değiştiriciler

| Değiştirici | Açıklama |
| --- | --- |
| `.-invalid` | Invalid (error) state. |
| `.-label-placement-end` | Place the label after the control. |
| `.-label-placement-start` | Place the label before the control. |
| `.-label-placement-top` | Place the label above the control. |
| `.-readonly` | Read-only state. |
| `.-required` | Show the required-field asterisk next to the label. |
| `.-size-large` | Large. Long-form alias of `-size-lg`. |
| `.-size-lg` | Large. |
| `.-size-sm` | Small. |
| `.-size-small` | Small. Long-form alias of `-size-sm`. |
| `.-variant-toggle` | Render as a switch instead of a box. |

## Bölümler

| Parça | Açıklama |
| --- | --- |
| `.asterisk` | The required-field asterisk. |

## Sözde elemanlar

| Sözde eleman | Açıklama |
| --- | --- |
| `::after` | On `-variant-toggle`, the state glyph riding the handle: an X when off, a check when on. |
| `::before` | The masked tick or dash glyph centered in the box; on `-variant-toggle` it becomes the sliding handle instead. |

## Durumlar

| Durum | Açıklama |
| --- | --- |
| `:checked` | — |
| `:disabled` | — |
| `:indeterminate` | — |

## Özel özellikler

| Özellik | Tür | Varsayılan | Açıklama |
| --- | --- | --- | --- |
| `--pantoken-cb-glyph` | `<url>` | — | The box's mask glyph: a tick when checked, a dash when indeterminate. |
| `--pantoken-toggle-bw` | `<length>` | — | The toggle border width. |
| `--pantoken-toggle-h` | `<length>` | — | The toggle switch height. |
| `--pantoken-toggle-handle` | `<length>` | — | The computed handle diameter. |
| `--pantoken-toggle-inset` | `<length>` | — | The handle inset from each track edge. |
| `--pantoken-toggle-w` | `<length>` | — | The toggle track width. |

## Tüketilen tokenler

| Token | Tür | Değer |
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

## İlgili

- [radio](/tr/api/css/radio.md) — The single-select counterpart.

