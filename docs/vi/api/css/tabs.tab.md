# CSS: tabs.tab

`.tab` — A single tab button (InstUI `Tabs.Tab`, configured via the parent `Tabs`'s tab list); `-selected` marks the active one.

The parent `tabs`'s `-variant-secondary` modifier restyles this member into a rounded "folder" tab — see `tabs`'s own doc for that modifier.

## Sử dụng

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/tabs.tab.css";
```

## Bộ sửa

| Bộ sửa | Mô tả |
| --- | --- |
| `.-disabled` | Non-interactive; same styling as `[aria-disabled="true"]`/`:disabled`. |
| `.-selected` | The active tab; same styling as `[aria-selected="true"]`. |

## Trạng thái

| Trạng thái | Mô tả |
| --- | --- |
| `[aria-disabled="true"]` | — |
| `[aria-selected="true"]` | — |
| `:disabled` | — |
| `:state(selected)` | — |

## Token tiêu thụ

| Token | Kiểu | Giá trị |
| --- | --- | --- |
| `--instui-component-tabs-panel-border-width` | `<length>` | `0.0625rem` |
| `--instui-component-tabs-tab-default-hover-border-color` | `<color>` | `light-dark(#8D959F, #6A7883)` |
| `--instui-component-tabs-tab-default-selected-border-color` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-tabs-tab-default-text-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-tabs-tab-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-tabs-tab-font-size` | `<length>` | `1rem` |
| `--instui-component-tabs-tab-font-weight` | `<integer>` | `400` |
| `--instui-component-tabs-tab-line-height` | `<percentage>` | `125%` |
| `--instui-component-tabs-tab-secondary-selected-background` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-tabs-tab-secondary-selected-border-color` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-tabs-tab-secondary-selected-text-color` | `<color>` | `light-dark(#ffffff, #1C222B)` |
| `--instui-component-tabs-tab-secondary-text-color` | `<color>` | `light-dark(#273540, #ffffff)` |

