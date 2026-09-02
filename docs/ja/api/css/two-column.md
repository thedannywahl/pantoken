# CSS: two-column

`div[class~="instui-two-column"]` — Two-column layout with left and right content regions.

✅ Use Two-Column when:

- You have two content areas of roughly equal importance
- Comparing or contrasting two sets of content side-by-side
- Building a responsive layout that stacks on mobile
🚫 Don't use Two-Column when:

- One column dominates the page — use asymmetric layout instead
- Content doesn't benefit from side-by-side presentation

## アクセシビリティ

- Ensure both columns are perceivable and usable on narrow viewports
- Use semantic landmarks (e.g., `&lt;section&gt;`) to wrap column content
- Maintain sufficient space and contrast between columns

## 使用法

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## パーツ

| パート | 説明 |
| --- | --- |
| `.instui-divider` | Optional visual divider between columns. |
| `.instui-left` | Left column content area. |
| `.instui-right` | Right column content area. |

## 状態

| 状態 | 説明 |
| --- | --- |
| `:optional` | — |

## 条件

| 型 | クエリ | 説明 |
| --- | --- | --- |
| media | `(max-width: 768px)` | — |

## 使用トークン

| トークン | 型 | 値 |
| --- | --- | --- |
| `--instui-color-border` | — | — |
| `--instui-space-large` | — | — |
| `--instui-space-medium` | — | — |

## 関連項目

- [page-layout](/ja/api/css/page-layout.md)

