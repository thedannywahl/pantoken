# CSS: testimonial

`div[class~="instui-testimonial"]` — Quote or testimonial display with attribution and optional imagery.

✅ Use Testimonial when:

- Displaying customer or user testimonials and quotes
- You want to highlight a statement with visual emphasis
- Attribution and context (name, title, image) are important
🚫 Don't use Testimonial when:

- Displaying inline quotes in body text — use a blockquote element instead
- The statement is the main focus — use Hero or Card instead

## アクセシビリティ

- Use `&lt;blockquote&gt;` semantically for the quote
- Ensure attribution is clear and associated with the quote
- If using images, provide alt text

## 使用法

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## パーツ

| パート | 説明 |
| --- | --- |
| `.instui-author` | Attribution author name. |
| `.instui-avatar` | Optional author profile image. |
| `.instui-content` | Container for quote and attribution. |
| `.instui-quote` | The quoted text. |
| `.instui-title` | Optional author title or affiliation. |

## 状態

| 状態 | 説明 |
| --- | --- |
| `:optional` | — |

## 使用トークン

| トークン | 型 | 値 |
| --- | --- | --- |
| `--instui-color-background` | — | — |
| `--instui-color-primary` | — | — |
| `--instui-color-surface` | — | — |
| `--instui-color-text-primary` | — | — |
| `--instui-color-text-secondary` | — | — |
| `--instui-font-size-small` | `<length>` | — |
| `--instui-font-weight-semibold` | — | — |
| `--instui-radius-medium` | — | — |
| `--instui-space-large` | — | — |
| `--instui-space-medium` | — | — |
| `--instui-space-small` | — | — |

## 関連項目

- [card](/ja/api/css/card.md)

