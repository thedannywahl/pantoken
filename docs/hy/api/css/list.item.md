# CSS: list.item

`.instui-list` — Ցանկի տարր (InstUI `List.Item`):

Ծնող `list`'s `-size-sm`/`-size-lg`, `-ordered`, and `-delimiter-solid`/`-delimiter-dashed` փոփոխիչներ վերականգնում են այս անդամին — տե՛ս `list`'s իր իսկ փաստաթուղթը այդ փոփոխիչների համար:

## Օգտագործում

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/list.item.css";
```

## Մոդիֆիկատորներ

| Մոդիֆիկատոր | Նկարագիր |
| --- | --- |
| `.-delimiter-dashed` | Առանձնացնել տարրերը գծիկ կանոնով: @affects list.item — Ավելացնում է սահմանազատիչ կանոն տարրերի միջև: |
| `.-delimiter-solid` | Առանձնացնել տարրերը պինդ կանոնով: @affects list.item — Ավելացնում է սահմանազատիչ կանոն տարրերի միջև: |
| `.-ordered` | Տեղադրված ցանկի համարակալում: @affects list.item — Ավելացնում է նշիչ կշիռ և ընդվզում: |
| `.-size-large` | `-size-lg`-ի երկար ձևի անվանում: |
| `.-size-medium` | `-size-md`-ի երկար ձևի անվանում: |
| `.-size-small` | `-size-sm`-ի երկար ձևի անվանում: |

## Պսևդո-էլեմենտներ

| Պսևդո-էլեմենտ | Նկարագիր |
| --- | --- |
| `::marker` | Վերածում է ցանկի կետ կամ տեղադրված ցանկի համար: |

## Ցուցիչներ սպառված

| Տոկեն | Տիպ | Արժեք |
| --- | --- | --- |
| `--instui-component-list-item-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-list-item-delimiter-dashed-border-color` | `<color>` | `light-dark(#E8EAEC, #2D3D49)` |
| `--instui-component-list-item-delimiter-dashed-border-style` | — | `dashed` |
| `--instui-component-list-item-delimiter-dashed-border-width` | `<length>` | `0.0625rem` |
| `--instui-component-list-item-delimiter-solid-border-color` | `<color>` | `light-dark(#E8EAEC, #2D3D49)` |
| `--instui-component-list-item-delimiter-solid-border-style` | — | `solid` |
| `--instui-component-list-item-delimiter-solid-border-width` | `<length>` | `0.0625rem` |
| `--instui-component-list-item-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-list-item-font-size-large` | `<length>` | `1.25rem` |
| `--instui-component-list-item-font-size-medium` | `<length>` | `1rem` |
| `--instui-component-list-item-font-size-small` | `<length>` | `0.875rem` |
| `--instui-component-list-item-font-weight` | `<integer>` | `400` |
| `--instui-component-list-item-line-height` | `<percentage>` | `150%` |
| `--instui-component-list-item-spacing-medium` | `<length>` | `1.5rem` |
| `--instui-component-list-ordered-number-font-weight` | `<integer>` | `600` |
| `--instui-component-list-ordered-number-margin` | `<length>` | `0.5rem` |

