# CSS: testimonial

`div[class~="instui-testimonial"]` — Quote or testimonial display with attribution and optional imagery.

✅ Use Testimonial when:

- Displaying customer or user testimonials and quotes
- You want to highlight a statement with visual emphasis
- Attribution and context (name, title, image) are important
🚫 Don't use Testimonial when:

- Displaying inline quotes in body text — use a blockquote element instead
- The statement is the main focus — use Hero or Card instead

## Tilgjenge

- Use `&lt;blockquote&gt;` semantically for the quote
- Ensure attribution is clear and associated with the quote
- If using images, provide alt text

## Bruk

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Delar

| Del | Skildring |
| --- | --- |
| `.instui-author` | Attribution author name. |
| `.instui-avatar` | Optional author profile image. |
| `.instui-content` | Container for quote and attribution. |
| `.instui-quote` | The quoted text. |
| `.instui-title` | Optional author title or affiliation. |

## Tilstandar

| Tilstand | Skildring |
| --- | --- |
| `:optional` | — |

## Token brukt

| Token | Type | Verdi |
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

## Relatert

- [card](/nn/api/css/card.md)

