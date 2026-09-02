# CSS: hero

`div[class~="instui-hero"]` — Full-width header section with title, subtitle, and optional background image.

✅ Use Hero when:

- You need a prominent page header with visual hierarchy
- The page benefits from a large, eye-catching opening section
- You want to include background imagery or gradient accents
🚫 Don't use Hero when:

- Building a simple page header — use Page-Layout instead
- The hero competes with critical content — prioritize readability

## Saavutettavuus

- Ensure the title is in an `&lt;h1&gt;` tag for semantic structure
- If using background images, provide sufficient color contrast for text
- Avoid autoplay on video or animation that could distract from content

## Käyttö

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Slotit

| Paikka | Kuvaus |
| --- | --- |
| `subtitle` | Hero subtitle content |
| `title` | Hero title content |

## Osat

| Osa | Kuvaus |
| --- | --- |
| `.instui-actions` | Optional action buttons or links. |
| `.instui-background` | Optional background layer (image or gradient). |
| `.instui-content` | Container for hero text and actions. |
| `.instui-overlay` | Optional semi-transparent overlay for text contrast. |
| `.instui-subtitle` | Optional supporting text or description. |
| `.instui-title` | Main hero title (typically `&lt;h1&gt;`). |

## Pseudo-elementit

| Pseudo-elementti | Kuvaus |
| --- | --- |
| `::before` | — |

## Tilat

| Tila | Kuvaus |
| --- | --- |
| `:optional` | — |

## Käytetyt tokenit

| Token | Tyyppi | Arvo |
| --- | --- | --- |
| `--instui-color-primary-background` | — | — |
| `--instui-font-size-hero` | `<length>` | — |
| `--instui-font-size-large` | `<length>` | — |
| `--instui-font-weight-bold` | — | — |
| `--instui-space-large` | — | — |
| `--instui-space-medium` | — | — |

## Liittyvät

- [card](/fi/api/css/card.md)

