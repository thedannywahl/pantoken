# CSS: two-column

`div[class~="instui-two-column"]` — Two-column layout with left and right content regions.

✅ Use Two-Column when:

- You have two content areas of roughly equal importance
- Comparing or contrasting two sets of content side-by-side
- Building a responsive layout that stacks on mobile
🚫 Don't use Two-Column when:

- One column dominates the page — use asymmetric layout instead
- Content doesn't benefit from side-by-side presentation

## Wātea mō te katoa

- Ensure both columns are perceivable and usable on narrow viewports
- Use semantic landmarks (e.g., `&lt;section&gt;`) to wrap column content
- Maintain sufficient space and contrast between columns

## Ngā Whakamahi

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Wāhanga

| Wāhanga | Whakamārama |
| --- | --- |
| `.instui-divider` | Optional visual divider between columns. |
| `.instui-left` | Left column content area. |
| `.instui-right` | Right column content area. |

## Ngā āhuatanga

| Tūnga | Whakamārama |
| --- | --- |
| `:optional` | — |

## Ngā Conditions

| Momo | Pātai | Whakamārama |
| --- | --- | --- |
| media | `(max-width: 768px)` | — |

## Ngā tohu i whakamahia

| Tohu | Momo | Uara |
| --- | --- | --- |
| `--instui-color-border` | — | — |
| `--instui-space-large` | — | — |
| `--instui-space-medium` | — | — |

## Hono

- [page-layout](/mi/api/css/page-layout.md)

