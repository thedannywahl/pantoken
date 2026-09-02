# CSS: checkbox

`.instui-checkbox` — Ծնական checkbox և նրա պիտակ, կամ անջատիչ `-variant-toggle` միջոցով:

Սահմանեք `el.indeterminate = true`-ը JavaScript-ում խառն վիճակի ընդհատումը ցուցադրելու համար; նշված նշանակումը ինքնաբերար հակադրվում է լցոնմանը — սպիտակ մութ լցոնմանի վրա, գրեթե սև բաց լցոնմանի վրա: Նաև սահմանում է իր սեփական `gap`-ը վերահսկման և դրա պիտակի միջև; `-gap-*` տարածման ծառայական փոփոխիչը շղթայել վերակազմակերպում է այդ ներկառուցված արժեքը:

**Աղբյուր:** [checkbox.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/checkbox/checkbox.css)

## Մուտքականություն

Ծանուցիչ `<input type="checkbox">`-ը վարում է `:checked`-ը, `:indeterminate`-ը և `:disabled`-ը; սահմանեք `el.indeterminate = true`-ը JavaScript-ում խառն վիճակի համար, և նկատեք, որ `-readonly`-ը միայն ձևավորում է, քանի որ նշանակներն ունեն ծանուցիչ readonly հատկանիշ:

## Օգտագործում

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/checkbox.css";
```

## Օրինակներ

```html
<label class="instui-checkbox --display-block --mb-sm">
  <input type="checkbox" checked>Checkbox
</label>
<label class="instui-checkbox -variant-toggle">
  <input type="checkbox">Toggle
</label>
```

## Մոդիֆիկատորներ

| Մոդիֆիկատոր | Նկարագիր |
| --- | --- |
| `.-invalid` | Անվավեր (սխալ) վիճակ: |
| `.-label-placement-end` | Տեղադրեք պիտակը վերահսկման հետո: |
| `.-label-placement-start` | Տեղադրեք պիտակը վերահսկման առաջ: |
| `.-label-placement-top` | Տեղադրեք պիտակը վերահսկման վերևում: |
| `.-readonly` | Միայն կարդալու համար վիճակ: |
| `.-required` | Ցույց տալ պահանջվող դաշտի աստղանիշը պիտակի կողքին: |
| `.-size-large` | Մեծ. Երկար-ձեւ այլանունը `-size-lg`: |
| `.-size-lg` | Մեծ: |
| `.-size-sm` | Փոքր: |
| `.-size-small` | Փոքր. Երկար-ձեւ այլանունը `-size-sm`: |
| `.-variant-toggle` | Պատկերել որպես անջատիչ՝ ոչ թե տուփ: |

## Մասեր

| Մաս | Նկարագիր |
| --- | --- |
| `.asterisk` | Պահանջվող դաշտի աստղանիշ: |

## Պսևդո-էլեմենտներ

| Պսևդո-էլեմենտ | Նկարագիր |
| --- | --- |
| `::after` | `-variant-toggle`-ի վրա վիճակի գլիֆը, որ շարժվում է պահակի վրա՝ X-ը, երբ անջատված է, նշանակումը՝ երբ միացած է: |
| `::before` | Ծածկված նշանակումը կամ ընդհատման գլիֆը, որ կենտրոնացած է տուփում; `-variant-toggle`-ի վրա այն դառնում է սահող պահակ: |

## Փոփոխական վիճակներ

| Վիճակ | Նկարագիր |
| --- | --- |
| `:checked` | — |
| `:disabled` | — |
| `:indeterminate` | — |

## Անհատական հատկություններ

| Առանձնահատկություն | Տիպ | Ընթացիկ | Նկարագիր |
| --- | --- | --- | --- |
| `--pantoken-cb-glyph` | `<url>` | — | Տուփի մասկի գլիֆը՝ նշանակումը, երբ նշված է, ընդհատումը՝ երբ անորոշ: |
| `--pantoken-toggle-bw` | `<length>` | — | Անջատիչի եզրի լայնությունը: |
| `--pantoken-toggle-h` | `<length>` | — | Անջատիչի բարձրությունը: |
| `--pantoken-toggle-handle` | `<length>` | — | Հաշվարկված պահակի տրամագիծ: |
| `--pantoken-toggle-inset` | `<length>` | — | Պահակի տեղաշարժ յուրաքանչյուր հետքի եզրից: |
| `--pantoken-toggle-w` | `<length>` | — | Անջատիչի հետքի լայնությունը: |

## Ցուցիչներ սպառված

| Տոկեն | Տիպ | Արժեք |
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

## Ավելին կապված

- [radio](/hy/api/css/radio.md) — Մեկ ընտրության գործընկերը:

