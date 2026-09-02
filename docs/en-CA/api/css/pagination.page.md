# CSS: pagination.page

`.page` — A page link or button (InstUI `Pagination.Page`); the current page carries `[aria-current]`.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/pagination.page.css";
```

## Modifiers

| Modifier | Description |
| --- | --- |
| `.-current` | The current page; same styling as `[aria-current]`. |

## States

| State | Description |
| --- | --- |
| `:state(current)` | — |

## Tokens consumed

| Token | Type | Value |
| --- | --- | --- |
| `--instui-border-width-md` | `<length>` | `0.125rem` |
| `--instui-color-background-interactive-action-primary-base` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-color-background-interactive-action-primary-hover` | `<color>` | `light-dark(#234465, #ffffff)` |
| `--instui-color-background-muted` | `<color>` | `light-dark(#F2F4F5, #273540)` |
| `--instui-color-text-interactive-action-primary-base` | `<color>` | `light-dark(#ffffff, #1D354F)` |
| `--instui-color-text-interactive-navigation-primary-base` | `<color>` | `light-dark(#2369A4, #7FB4F1)` |
| `--instui-color-text-interactive-navigation-primary-hover` | `<color>` | `light-dark(#1A5281, #ACCDF7)` |
| `--instui-component-base-button-border-radius` | `<length>` | `0.75rem` |
| `--instui-font-weight-interactive` | `<integer>` | `500` |
| `--instui-spacing-space-xs` | `<length>` | `0.25rem` |
| `--instui-spacing-space2xs` | `<length>` | `0.125rem` |

