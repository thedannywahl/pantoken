# CSS: spinner

`.instui-spinner` — Մեծ բեռնավորման միջանց; տալ այն role="status" և aria-label:

`-color-inverse` միայն վերաներկում է մեծ վերևի սահմաններ հատվածը, ոչ թե ամբողջ հետքը, այնպես որ այն դեռ ճիշտ կարդացվում է մութ քարտեզի վրա առանց առանձին հետքի գույն կարիքի:

**Աղբյուր:** [spinner.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/spinner/spinner.css)

## Մուտքականություն

Տալ պտույտ role="status" և aria-label այնպես որ էկրան ընթերցողները հայտարարեն այն որպես կենդանի բեռնավորման վիճակ:

## Օգտագործում

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/spinner.css";
```

## Դեմո

```demo
self:spinner
```

## Օրինակներ

```html
<span class="instui-spinner" role="status" aria-label="Loading"></span>
```
### Inverse color -nocard
```html
<div class="instui-view instui-card -background-primary-inverse">
  <span class="instui-spinner -color-inverse" role="status" aria-label="Loading"></span>
</div>
```

## Մոդիֆիկատորներ

| Մոդիֆիկատոր | Նկարագիր |
| --- | --- |
| `.-color-inverse` | Մութ մակերեսի վրա: |
| `.-size-large` | Մեծ. Երկար-ձեւ այլանունը `-size-lg`: |
| `.-size-lg` | Մեծ: |
| `.-size-sm` | Փոքր: |
| `.-size-small` | Փոքր. Երկար-ձեւ այլանունը `-size-sm`: |
| `.-size-x-small` | Շատ փոքր: `-size-xs`-ի երկար ձեւ կեղծանուն: |
| `.-size-xs` | Շատ փոքր: |

## Անիմացիաներ

| Անիմացիա | Նկարագիր |
| --- | --- |
| `pantoken-spinner-rotate` | — |

## Ցուցիչներ սպառված

| Տոկեն | Տիպ | Արժեք |
| --- | --- | --- |
| `--instui-component-spinner-color` | `<color>` | `light-dark(#2871AF, #7FB4F1)` |
| `--instui-component-spinner-inverse-color` | `<color>` | `#ffffff` |
| `--instui-component-spinner-spinner-size-lg` | `<length>` | `4.5rem` |
| `--instui-component-spinner-spinner-size-md` | `<length>` | `3.5rem` |
| `--instui-component-spinner-spinner-size-sm` | `<length>` | `2rem` |
| `--instui-component-spinner-spinner-size-xs` | `<length>` | `1rem` |
| `--instui-component-spinner-stroke-width-lg` | `<length>` | `0.75em` |
| `--instui-component-spinner-stroke-width-md` | `<length>` | `0.5em` |
| `--instui-component-spinner-stroke-width-sm` | `<length>` | `0.375em` |
| `--instui-component-spinner-stroke-width-xs` | `<length>` | `0.25em` |
| `--instui-component-spinner-track-color` | `<color>` | `light-dark(rgba(35,68,101,0.1), rgba(255,255,255,0.1))` |

