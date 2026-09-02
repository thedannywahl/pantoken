# CSS: two-column

`div[class~="instui-two-column"]` — Two-column layout with left and right content regions.

✅ Use Two-Column when:

- You have two content areas of roughly equal importance
- Comparing or contrasting two sets of content side-by-side
- Building a responsive layout that stacks on mobile
🚫 Don't use Two-Column when:

- One column dominates the page — use asymmetric layout instead
- Content doesn't benefit from side-by-side presentation

## 無障礙

- Ensure both columns are perceivable and usable on narrow viewports
- Use semantic landmarks (e.g., `&lt;section&gt;`) to wrap column content
- Maintain sufficient space and contrast between columns

## 使用方法

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## 部件

| 部件 | 說明 |
| --- | --- |
| `.instui-divider` | Optional visual divider between columns. |
| `.instui-left` | Left column content area. |
| `.instui-right` | Right column content area. |

## 狀態

| 狀態 | 說明 |
| --- | --- |
| `:optional` | — |

## 條件

| 型別 | 查詢 | 說明 |
| --- | --- | --- |
| media | `(max-width: 768px)` | — |

## 已使用的代幣

| 代幣 | 型別 | 值 |
| --- | --- | --- |
| `--instui-color-border` | — | — |
| `--instui-space-large` | — | — |
| `--instui-space-medium` | — | — |

## 相關

- [page-layout](/zh-Hant/api/css/page-layout.md)

