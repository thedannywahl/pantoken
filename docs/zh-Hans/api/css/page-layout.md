# CSS: page-layout

`div[class~="instui-page-layout"]` — Standard three-column page layout with header, sidebar, and main content.

✅ Use Page-Layout when:

- You need a classic page structure with navigation and content areas
- The page has a clear main content area flanked by complementary regions
- You want consistent spacing and alignment across the layout
🚫 Don't use Page-Layout when:

- Building a single-column page — use a simpler layout instead
- The sidebar competes with main content for importance

## 无障碍

- Map the main content area to a `&lt;main&gt;` landmark
- Give the sidebar `role="navigation"` or `role="complementary"` as appropriate
- Ensure landmark regions have distinct aria-labels

## 用法

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## 部件

| 部件 | 描述 |
| --- | --- |
| `.instui-body` | Main body containing sidebar and content. |
| `.instui-footer` | Bottom footer region. |
| `.instui-header` | Top header region. |
| `.instui-main` | Central content area. |
| `.instui-sidebar` | Left navigation or auxiliary column. |

## 状态

| 状态 | 描述 |
| --- | --- |
| `:optional` | — |

## 消耗代币

| 代币 | 类型 | 值 |
| --- | --- | --- |
| `--instui-color-border` | — | — |
| `--instui-color-footer-background` | — | — |
| `--instui-color-footer-text` | — | — |
| `--instui-color-header-background` | — | — |
| `--instui-color-sidebar-background` | — | — |
| `--instui-font-size-small` | `<length>` | — |
| `--instui-space-medium` | — | — |

## 相关

- [wrapper](/zh-Hans/api/css/wrapper.md)

