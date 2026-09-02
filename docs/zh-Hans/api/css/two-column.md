# CSS: two-column

`div[class~="instui-two-column"]` — Two-column layout with left and right content regions.

✅ Use Two-Column when:

- You have two content areas of roughly equal importance
- Comparing or contrasting two sets of content side-by-side
- Building a responsive layout that stacks on mobile
🚫 Don't use Two-Column when:

- One column dominates the page — use asymmetric layout instead
- Content doesn't benefit from side-by-side presentation

## 无障碍

- Ensure both columns are perceivable and usable on narrow viewports
- Use semantic landmarks (e.g., `&lt;section&gt;`) to wrap column content
- Maintain sufficient space and contrast between columns

## 用法

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## 部件

| 部件 | 描述 |
| --- | --- |
| `.instui-divider` | Optional visual divider between columns. |
| `.instui-left` | Left column content area. |
| `.instui-right` | Right column content area. |

## 状态

| 状态 | 描述 |
| --- | --- |
| `:optional` | — |

## 条件

| 类型 | 查询 | 描述 |
| --- | --- | --- |
| media | `(max-width: 768px)` | — |

## 消耗代币

| 代币 | 类型 | 值 |
| --- | --- | --- |
| `--instui-color-border` | — | — |
| `--instui-space-large` | — | — |
| `--instui-space-medium` | — | — |

## 相关

- [page-layout](/zh-Hans/api/css/page-layout.md)

