# CSS: testimonial

`div[class~="instui-testimonial"]` — Quote or testimonial display with attribution and optional imagery.

✅ Use Testimonial when:

- Displaying customer or user testimonials and quotes
- You want to highlight a statement with visual emphasis
- Attribution and context (name, title, image) are important
🚫 Don't use Testimonial when:

- Displaying inline quotes in body text — use a blockquote element instead
- The statement is the main focus — use Hero or Card instead

## การเข้าถึง

- Use `&lt;blockquote&gt;` semantically for the quote
- Ensure attribution is clear and associated with the quote
- If using images, provide alt text

## การใช้งาน

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## ส่วนประกอบ

| ส่วน | คำอธิบาย |
| --- | --- |
| `.instui-author` | Attribution author name. |
| `.instui-avatar` | Optional author profile image. |
| `.instui-content` | Container for quote and attribution. |
| `.instui-quote` | The quoted text. |
| `.instui-title` | Optional author title or affiliation. |

## สถานะ

| สถานะ | คำอธิบาย |
| --- | --- |
| `:optional` | — |

## โทเค็นที่ใช้

| โทเค็น | ชนิด | ค่า |
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

## ที่เกี่ยวข้อง

- [card](/th/api/css/card.md)

