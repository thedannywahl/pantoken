# CSS: hero

`div[class~="instui-hero"]` — Full-width header section with title, subtitle, and optional background image.

✅ Use Hero when:

- You need a prominent page header with visual hierarchy
- The page benefits from a large, eye-catching opening section
- You want to include background imagery or gradient accents
🚫 Don't use Hero when:

- Building a simple page header — use Page-Layout instead
- The hero competes with critical content — prioritize readability

## एक्सेसिबिलिटी

- Ensure the title is in an `&lt;h1&gt;` tag for semantic structure
- If using background images, provide sufficient color contrast for text
- Avoid autoplay on video or animation that could distract from content

## उपयोग

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## स्लॉट्स

| स्लॉट | विवरण |
| --- | --- |
| `subtitle` | Hero subtitle content |
| `title` | Hero title content |

## पार्ट्स

| भाग | विवरण |
| --- | --- |
| `.instui-actions` | Optional action buttons or links. |
| `.instui-background` | Optional background layer (image or gradient). |
| `.instui-content` | Container for hero text and actions. |
| `.instui-overlay` | Optional semi-transparent overlay for text contrast. |
| `.instui-subtitle` | Optional supporting text or description. |
| `.instui-title` | Main hero title (typically `&lt;h1&gt;`). |

## स्यूडो-एलिमेंट्स

| स्यूडो-एलिमेंट | विवरण |
| --- | --- |
| `::before` | — |

## स्टेट्स

| स्थिति | विवरण |
| --- | --- |
| `:optional` | — |

## उपयोग किये गए टोकन

| टोकन | प्रकार | मान |
| --- | --- | --- |
| `--instui-color-primary-background` | — | — |
| `--instui-font-size-hero` | `<length>` | — |
| `--instui-font-size-large` | `<length>` | — |
| `--instui-font-weight-bold` | — | — |
| `--instui-space-large` | — | — |
| `--instui-space-medium` | — | — |

## संबंधित

- [card](/hi/api/css/card.md)

