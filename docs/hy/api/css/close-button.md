# CSS: close-button

`.instui-close-button` — Թափանցիկ պատկերակ կոճակ, որ նկարում է իր սեփական × գլիֆը՝ երեք չափսերով գումարած հակադարձ տարբերակ:

Միշտ պատկերվում է որպես միայն պատկերակ վերահսկում, առանց տեսանելի պիտակի, այնպես որ `aria-label`-ը պահանջվածն է, ոչ ընտրովի; համեմատել `button`-ի `-without-background` խմբայց տարբերակի հետ, որ պահպանում է տեքստային պիտակ:

**Աղբյուր:** [close-button.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/close-button/close-button.css)

<!-- js-requirement -->
> [!TIP]
> **JS բարելավում** — Այս բաղադրիչի CSS-ը ցուցադրվում և աշխատում է ինքնուրույն՝ միացրեք այն `@pantoken/interactions`-ի հետ՝ ինտերակտիվ վարքածություն ավելացնելու համար: Տես [մոդիֆիկատորի աղյուսակը ստորեւ](#modifiers):


## Մուտքականություն

Տալ պատկերակ միայն կոճակին `aria-label`-ել (օր. «Փակել»):

## Օգտագործում

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/close-button.css";
```

## Օրինակներ

```html
<button class="instui-close-button -size-sm" aria-label="Close"></button>
```

## Մոդիֆիկատորներ

| Մոդիֆիկատոր | Նկարագիր |
| --- | --- |
| `.-color-inverse` | Մութ ֆոնի համար: |
| `.-size-large` | Մեծ. Երկար-ձեւ այլանունը `-size-lg`: |
| `.-size-lg` | Մեծ: |
| `.-size-sm` | Փոքր: |
| `.-size-small` | Փոքր. Երկար-ձեւ այլանունը `-size-sm`: |

## Պսևդո-էլեմենտներ

| Պսևդո-էլեմենտ | Նկարագիր |
| --- | --- |
| `::before` | × գլիֆը, որ ծածկված է `currentColor`-ում: |

## Ցուցիչներ սպառված

| Տոկեն | Տիպ | Արժեք |
| --- | --- | --- |
| `--instui-color-background-interactive-action-tertiary-active` | `<color>` | `light-dark(#E2EAF7, #234465)` |
| `--instui-color-background-interactive-action-tertiary-hover` | `<color>` | `light-dark(#EEF4FD, #2E5177)` |
| `--instui-color-text-interactive-action-secondary-base` | `<color>` | `light-dark(#1D354F, #ffffff)` |
| `--instui-component-base-button-border-radius` | `<length>` | `0.75rem` |
| `--instui-component-base-button-large-height` | `<length>` | `3rem` |
| `--instui-component-base-button-medium-height` | `<length>` | `2.5rem` |
| `--instui-component-base-button-primary-inverse-ghost-color` | `<color>` | `#ffffff` |
| `--instui-component-base-button-small-height` | `<length>` | `2rem` |
| `--instui-icon-x` | `<image>` | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M18%206%206%2018%22%2F%3E%3Cpath%20d%3D%22m6%206%2012%2012%22%2F%3E%3C%2Fsvg%3E')` |
| `--instui-spacing-space-xs` | `<length>` | `0.25rem` |

## Ավելին կապված

- [button](/hy/api/css/button.md) — Ընդհանուր նպատակային գործողության կոճակ:

