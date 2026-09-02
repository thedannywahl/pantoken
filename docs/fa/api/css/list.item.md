# CSS: list.item

`.instui-list` — A list item (InstUI `List.Item`).

The parent `list`'s `-size-sm`/`-size-lg`, `-ordered`, and `-delimiter-solid`/`-delimiter-dashed` modifiers restyle this member — see `list`'s own doc for those modifiers.

## نحوه استفاده

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/list.item.css";
```

## تعدیل‌کننده‌ها

| تعدیل‌کننده | توضیحات |
| --- | --- |
| `.-delimiter-dashed` | Separate items with a dashed rule. @affects list.item — Adds the delimiter rule between items. |
| `.-delimiter-solid` | Separate items with a solid rule. @affects list.item — Adds the delimiter rule between items. |
| `.-ordered` | Ordered-list numbering. @affects list.item — Adds marker weight and indentation. |
| `.-size-large` | Long-form alias of `-size-lg`. |
| `.-size-medium` | Long-form alias of `-size-md`. |
| `.-size-small` | Long-form alias of `-size-sm`. |

## نیمه‌عناصر (Pseudo-elements)

| نیمه‌عنصر | توضیحات |
| --- | --- |
| `::marker` | Renders the list bullet or ordered-list number. |

## توکن‌های مصرف‌شده

| توکن | نوع | مقدار |
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

