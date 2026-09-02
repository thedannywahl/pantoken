# CSS: rubric-note

`div[class~="instui-rubric-note"]` — Structured note with rubric categories and scoring indicators.

✅ Use Rubric-Note when:

- Displaying grading rubric or assessment criteria
- You need to structure content by category with scores or indicators
- The layout should emphasize structure and hierarchy
🚫 Don't use Rubric-Note when:

- Displaying simple notes or comments — use Callout instead
- Complex grading logic is needed — consider a custom component

## Tilgjengelighet

- Use table semantics if displaying a true rubric with rows and columns
- Ensure score indicators are not color-only
- Provide descriptive labels for each category

## Bruk

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Deler

| Del | Beskrivelse |
| --- | --- |
| `.instui-criteria` | Container for rubric criteria rows. |
| `.instui-description` | Detailed description of the criterion. |
| `.instui-header` | Header with title and metadata. |
| `.instui-name` | Criterion name or category. |
| `.instui-row` | Individual criterion row. |
| `.instui-score` | Score indicator or badge. |

## Tilstander

| Tilstand | Beskrivelse |
| --- | --- |
| `:optional` | — |

## Forbrukte tokens

| Token | Type | Verdi |
| --- | --- | --- |
| `--instui-color-background` | — | — |
| `--instui-color-border` | — | — |
| `--instui-color-info-background` | — | — |
| `--instui-color-info-text` | — | — |
| `--instui-color-primary` | — | — |
| `--instui-color-surface` | — | — |
| `--instui-color-text-secondary` | — | — |
| `--instui-font-size-small` | `<length>` | — |
| `--instui-font-weight-semibold` | — | — |
| `--instui-radius-medium` | — | — |
| `--instui-space-medium` | — | — |
| `--instui-space-small` | — | — |

## Relatert

- [card](/nb/api/css/card.md)

