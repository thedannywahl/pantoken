# CSS: link

`.instui-link` — Ոճավորված հիպերհղում չափերով, հակառակ տարբերակ մութ ֆոնի համար և տողային կամ ոճազերծ ձևեր:

Սահմանում է իր սեփական արձագանքային `gap` պատկերակի և դրա տեքստի միջև (`-size-sm`/`-size-lg` կշեռքը); շղթայավորելով `-gap-*` տարածության կոմունալ փոփոխիչ՝ վերակայում է այդ ներկառուցված արժեքը:

**Աղբյուր:** [link.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/link/link.css)

## Մուտքականություն

Նշել անջատված հղումը `aria-disabled="true"` -ով:

## Օգտագործում

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/link.css";
```

## Օրինակներ

```html
<a class="instui-link" href="#">A styled link</a>
```

## Մոդիֆիկատորներ

| Մոդիֆիկատոր | Նկարագիր |
| --- | --- |
| `.-color-inverse` | Մութ ֆոնի համար: |
| `.-inline` | Ներքին հղում, ընդգծված հոսող տեքստում: |
| `.-lg` | Մեծ ներքին հղում (օգտագործվում է `-inline` հետ): |
| `.-size-large` | Մեծ. Երկար-ձեւ այլանունը `-size-lg`: |
| `.-size-lg` | Մեծ: |
| `.-size-sm` | Փոքր: |
| `.-size-small` | Փոքր. Երկար-ձեւ այլանունը `-size-sm`: |
| `.-sm` | Փոքր ներքին հղում (օգտագործվում է `-inline` հետ): |
| `.-unstyled` | Շերտել հղման ոճ. ժառանգել գույն, առանց ընդգծման: |

## Փոփոխական վիճակներ

| Վիճակ | Նկարագիր |
| --- | --- |
| `[aria-disabled="true"]` | — |
| `:state(disabled)` | — |

## Ցուցիչներ սպառված

| Տոկեն | Տիպ | Արժեք |
| --- | --- | --- |
| `--instui-component-link-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-link-font-size-lg` | `<length>` | `1.75rem` |
| `--instui-component-link-font-size-md` | `<length>` | `1rem` |
| `--instui-component-link-font-size-sm` | `<length>` | `0.875rem` |
| `--instui-component-link-font-weight` | `<integer>` | `500` |
| `--instui-component-link-gap-lg` | `<length>` | `0.25rem` |
| `--instui-component-link-gap-md` | `<length>` | `0.25rem` |
| `--instui-component-link-gap-sm` | `<length>` | `0.125rem` |
| `--instui-component-link-inline-link-large-font-size` | `<length>` | `1.75rem` |
| `--instui-component-link-inline-link-large-font-weight` | `<integer>` | `600` |
| `--instui-component-link-inline-link-large-line-height` | `<length>` | `1.5rem` |
| `--instui-component-link-inline-link-medium-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-link-inline-link-medium-font-size` | `<length>` | `1rem` |
| `--instui-component-link-inline-link-medium-font-weight` | `<integer>` | `600` |
| `--instui-component-link-inline-link-medium-line-height` | `<length>` | `1.5rem` |
| `--instui-component-link-inline-link-small-font-size` | `<length>` | `0.875rem` |
| `--instui-component-link-inline-link-small-font-weight` | `<integer>` | `600` |
| `--instui-component-link-inline-link-small-line-height` | `<length>` | `0.875rem` |
| `--instui-component-link-line-height-lg` | `<length>` | `1.5rem` |
| `--instui-component-link-line-height-md` | `<length>` | `1rem` |
| `--instui-component-link-line-height-sm` | `<length>` | `0.875rem` |
| `--instui-component-link-on-color-text-color` | `<color>` | `#ffffff` |
| `--instui-component-link-on-color-text-disabled-color` | `<color>` | `light-dark(#C7CACD, #9EA6AD)` |
| `--instui-component-link-on-color-text-hover-color` | `<color>` | `light-dark(#DEEBFF, #ffffff)` |
| `--instui-component-link-text-color` | `<color>` | `light-dark(#2369A4, #7FB4F1)` |
| `--instui-component-link-text-decoration-outside-text` | `none \| [ underline \|\| overline \|\| line-through \|\| blink ] \| spelling-error \| grammar-error` | `none` |
| `--instui-component-link-text-decoration-within-text` | `none \| [ underline \|\| overline \|\| line-through \|\| blink ] \| spelling-error \| grammar-error` | `underline` |
| `--instui-component-link-text-disabled-color` | `<color>` | `light-dark(#8D959F, #576773)` |
| `--instui-component-link-text-hover-color` | `<color>` | `light-dark(#1A5281, #ACCDF7)` |
| `--instui-component-link-unstyled-text-color` | `<color>` | `light-dark(#273540, #F2F4F5)` |

## Ավելին կապված

- [breadcrumb](/hy/api/css/breadcrumb.md) — Հաբ հետքի վազքը կառուցված է հղումներից; նաև դրա փոքր էկրանի պահուստային լուծում (զուգակցել `responsive` կոմունալ հետ՝ հաբ հետքը փոխել հղումի համար ~768px-ից ցածր):

