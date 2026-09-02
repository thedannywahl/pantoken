# CSS: callout

`div[class~="instui-callout"]` — Inline information alert for a short reminder or note.

✅ Use Callout when:

- You need to highlight important information or reminders inline
- The message is relatively brief (a sentence to a short paragraph)
- The alert should draw attention without interrupting the main flow
🚫 Don't use Callout when:

- The message requires interaction or multiple actions — use a Modal or Alert Dialog
- The content is the main focus of the page — use a Card or Hero layout instead

## Dostępność

- Ensure the alert role is properly applied (role="alert" or role="status")
- Use semantic color contrast that meets WCAG AA standards
- Don't rely on color alone to convey meaning

## Użycie

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Sloty

| Slot | Opis |
| --- | --- |
| `message` | Alert message content |

## Części

| Część | Opis |
| --- | --- |
| `.instui-content` | Container for the text content. |
| `.instui-icon` | Optional icon to the left of the content. |

## Pseudo-elementy

| Pseudo-element | Opis |
| --- | --- |
| `::before` | — |

## Stany

| Stan | Opis |
| --- | --- |
| `:optional` | — |

## Zużyte tokeny

| Token | Typ | Wartość |
| --- | --- | --- |
| `--instui-color-info-background` | — | — |
| `--instui-color-info-border` | — | — |
| `--instui-color-info-text` | — | — |
| `--instui-radius-medium` | — | — |
| `--instui-size-small` | `<length>` | — |
| `--instui-space-medium` | — | — |
| `--instui-space-small` | — | — |

## Powiązane

- [alert](/pl/api/css/alert.md)

