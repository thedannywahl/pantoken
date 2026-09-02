# CSS: pagination.page

`.page` — A page link or button (InstUI `Pagination.Page`); the current page carries `[aria-current]`.

## 用法

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/pagination.page.css";
```

## 修饰符

| 修饰符 | 描述 |
| --- | --- |
| `.-current` | The current page; same styling as `[aria-current]`. |

## 状态

| 状态 | 描述 |
| --- | --- |
| `:state(current)` | — |

## 消耗代币

| 代币 | 类型 | 值 |
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

