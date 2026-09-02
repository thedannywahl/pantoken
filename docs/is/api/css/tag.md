# CSS: tag

`.instui-tag` — An inline chip for a keyword or filter.

Sets its own horizontal `padding` (`-size-sm`/`-size-lg` scale it); chaining a `-p-*`/`-padding-*` spacing utility modifier overrides that built-in value.

**Source:** [tag.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/tag/tag.css)

## Notkun

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/tag.css";
```

## Sýnidæmi

```demo
self:tag
```

## Dæmi

```html
<span class="instui-tag -size-sm">small</span>
```

## Breytingar

| Breyti | Lýsing |
| --- | --- |
| `.-inline` | Reads inline with text and gets a trailing dismiss glyph. |
| `.-readonly` | Read-only (non-dismissable) tag. |
| `.-size-large` | A large tag. Long-form alias of `-size-lg`. |
| `.-size-lg` | A large tag. |
| `.-size-sm` | A small tag. |
| `.-size-small` | A small tag. Long-form alias of `-size-sm`. |

## Sýndareiningar

| Sýndareining | Lýsing |
| --- | --- |
| `::after` | Renders the trailing dismiss glyph on a dismissible inline tag. |

## Notuð tákn

| Tákn | Tegund | Gildi |
| --- | --- | --- |
| `--instui-component-tag-default-background` | `<color>` | `light-dark(#44709F, #345B84)` |
| `--instui-component-tag-default-background-hover` | `<color>` | `light-dark(#44709F, #3E6895)` |
| `--instui-component-tag-default-border-color` | `<color>` | `light-dark(#44709F, #345B84)` |
| `--instui-component-tag-default-border-radius` | `<length>` | `0.5rem` |
| `--instui-component-tag-default-border-style` | — | `solid` |
| `--instui-component-tag-default-border-width` | `<length>` | `0.0625rem` |
| `--instui-component-tag-default-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-tag-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-tag-font-size-large` | `<length>` | `1rem` |
| `--instui-component-tag-font-size-medium` | `<length>` | `0.875rem` |
| `--instui-component-tag-font-size-small` | `<length>` | `0.75rem` |
| `--instui-component-tag-height-large` | `<length>` | `2rem` |
| `--instui-component-tag-height-medium` | `<length>` | `1.75rem` |
| `--instui-component-tag-height-small` | `<length>` | `1.5rem` |
| `--instui-component-tag-inline-background` | `<color>` | `light-dark(#44709F, #345B84)` |
| `--instui-component-tag-inline-background-hover` | `<color>` | `light-dark(#44709F, #3E6895)` |
| `--instui-component-tag-inline-border-color` | `<color>` | `light-dark(#44709F, #345B84)` |
| `--instui-component-tag-inline-border-radius` | `<length>` | `0.25rem` |
| `--instui-component-tag-inline-color` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-tag-inline-icon-color` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-tag-inline-icon-hover-color` | `<color>` | `light-dark(#234465, #ffffff)` |
| `--instui-component-tag-max-width` | `<length>` | `10rem` |
| `--instui-component-tag-padding-horizontal` | `<length>` | `0.5rem` |
| `--instui-component-tag-padding-horizontal-small` | `<length>` | `0.5rem` |
| `--instui-icon-x` | `<image>` | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M18%206%206%2018%22%2F%3E%3Cpath%20d%3D%22m6%206%2012%2012%22%2F%3E%3C%2Fsvg%3E')` |
| `--instui-spacing-space-xs` | `<length>` | `0.25rem` |

## Tengdar

- [pill](/is/api/css/pill.md) — The read-only label-chip counterpart.

