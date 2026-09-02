# CSS: testimonial

`div[class~="instui-testimonial"]` — Quote or testimonial display with attribution and optional imagery.

✅ Use Testimonial when:

- Displaying customer or user testimonials and quotes
- You want to highlight a statement with visual emphasis
- Attribution and context (name, title, image) are important
🚫 Don't use Testimonial when:

- Displaying inline quotes in body text — use a blockquote element instead
- The statement is the main focus — use Hero or Card instead

## 접근성

- Use `&lt;blockquote&gt;` semantically for the quote
- Ensure attribution is clear and associated with the quote
- If using images, provide alt text

## 사용법

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## 부분

| 부분 | 설명 |
| --- | --- |
| `.instui-author` | Attribution author name. |
| `.instui-avatar` | Optional author profile image. |
| `.instui-content` | Container for quote and attribution. |
| `.instui-quote` | The quoted text. |
| `.instui-title` | Optional author title or affiliation. |

## 상태

| 상태 | 설명 |
| --- | --- |
| `:optional` | — |

## 사용된 토큰

| 토큰 | 타입 | 값 |
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

## 관련 항목

- [card](/ko/api/css/card.md)

