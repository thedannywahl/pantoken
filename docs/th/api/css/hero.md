# CSS: hero

`div[class~="instui-hero"]` — Full-width header section with title, subtitle, and optional background image.

✅ Use Hero when:

- You need a prominent page header with visual hierarchy
- The page benefits from a large, eye-catching opening section
- You want to include background imagery or gradient accents
🚫 Don't use Hero when:

- Building a simple page header — use Page-Layout instead
- The hero competes with critical content — prioritize readability

## การเข้าถึง

- Ensure the title is in an `&lt;h1&gt;` tag for semantic structure
- If using background images, provide sufficient color contrast for text
- Avoid autoplay on video or animation that could distract from content

## การใช้งาน

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## สล็อต

| สล็อต | คำอธิบาย |
| --- | --- |
| `subtitle` | Hero subtitle content |
| `title` | Hero title content |

## ส่วนประกอบ

| ส่วน | คำอธิบาย |
| --- | --- |
| `.instui-actions` | Optional action buttons or links. |
| `.instui-background` | Optional background layer (image or gradient). |
| `.instui-content` | Container for hero text and actions. |
| `.instui-overlay` | Optional semi-transparent overlay for text contrast. |
| `.instui-subtitle` | Optional supporting text or description. |
| `.instui-title` | Main hero title (typically `&lt;h1&gt;`). |

## องค์ประกอบเทียม

| องค์ประกอบเทียม | คำอธิบาย |
| --- | --- |
| `::before` | — |

## สถานะ

| สถานะ | คำอธิบาย |
| --- | --- |
| `:optional` | — |

## โทเค็นที่ใช้

| โทเค็น | ชนิด | ค่า |
| --- | --- | --- |
| `--instui-color-primary-background` | — | — |
| `--instui-font-size-hero` | `<length>` | — |
| `--instui-font-size-large` | `<length>` | — |
| `--instui-font-weight-bold` | — | — |
| `--instui-space-large` | — | — |
| `--instui-space-medium` | — | — |

## ที่เกี่ยวข้อง

- [card](/th/api/css/card.md)

