# CSS: two-column

`div[class~="instui-two-column"]` — Two-column layout with left and right content regions.

✅ Use Two-Column when:

- You have two content areas of roughly equal importance
- Comparing or contrasting two sets of content side-by-side
- Building a responsive layout that stacks on mobile
🚫 Don't use Two-Column when:

- One column dominates the page — use asymmetric layout instead
- Content doesn't benefit from side-by-side presentation

## Toegankelijkheid

- Ensure both columns are perceivable and usable on narrow viewports
- Use semantic landmarks (e.g., `&lt;section&gt;`) to wrap column content
- Maintain sufficient space and contrast between columns

## Gebruik

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Onderdelen

| Onderdeel | Beschrijving |
| --- | --- |
| `.instui-divider` | Optional visual divider between columns. |
| `.instui-left` | Left column content area. |
| `.instui-right` | Right column content area. |

## Staten

| Toestand | Beschrijving |
| --- | --- |
| `:optional` | — |

## Voorwaarden

| Type | Zoekopdracht | Beschrijving |
| --- | --- | --- |
| media | `(max-width: 768px)` | — |

## Gebruikte tokens

| Token | Type | Waarde |
| --- | --- | --- |
| `--instui-color-border` | — | — |
| `--instui-space-large` | — | — |
| `--instui-space-medium` | — | — |

## Gerelateerd

- [page-layout](/nl/api/css/page-layout.md)

