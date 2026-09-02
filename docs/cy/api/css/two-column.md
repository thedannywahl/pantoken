# CSS: two-column

`div[class~="instui-two-column"]` — Two-column layout with left and right content regions.

✅ Use Two-Column when:

- You have two content areas of roughly equal importance
- Comparing or contrasting two sets of content side-by-side
- Building a responsive layout that stacks on mobile
🚫 Don't use Two-Column when:

- One column dominates the page — use asymmetric layout instead
- Content doesn't benefit from side-by-side presentation

## Hygyrchedd

- Ensure both columns are perceivable and usable on narrow viewports
- Use semantic landmarks (e.g., `&lt;section&gt;`) to wrap column content
- Maintain sufficient space and contrast between columns

## Defnydd

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Rhannau

| Rhan | Disgrifiad |
| --- | --- |
| `.instui-divider` | Optional visual divider between columns. |
| `.instui-left` | Left column content area. |
| `.instui-right` | Right column content area. |

## Statwsau

| Statws | Disgrifiad |
| --- | --- |
| `:optional` | — |

## Amodau

| Math | Ymchwiliad | Disgrifiad |
| --- | --- | --- |
| media | `(max-width: 768px)` | — |

## Tocynnau a ddefnyddiwyd

| Tocyn | Math | Gwerth |
| --- | --- | --- |
| `--instui-color-border` | — | — |
| `--instui-space-large` | — | — |
| `--instui-space-medium` | — | — |

## Perthnasol

- [page-layout](/cy/api/css/page-layout.md)

