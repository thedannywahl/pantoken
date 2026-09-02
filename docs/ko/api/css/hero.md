# CSS: hero

`div[class~="instui-hero"]` — Full-width header section with title, subtitle, and optional background image.

✅ Use Hero when:

- You need a prominent page header with visual hierarchy
- The page benefits from a large, eye-catching opening section
- You want to include background imagery or gradient accents
🚫 Don't use Hero when:

- Building a simple page header — use Page-Layout instead
- The hero competes with critical content — prioritize readability

## 접근성

- Ensure the title is in an `&lt;h1&gt;` tag for semantic structure
- If using background images, provide sufficient color contrast for text
- Avoid autoplay on video or animation that could distract from content

## 사용법

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## 슬롯

| 슬롯 | 설명 |
| --- | --- |
| `subtitle` | Hero subtitle content |
| `title` | Hero title content |

## 부분

| 부분 | 설명 |
| --- | --- |
| `.instui-actions` | Optional action buttons or links. |
| `.instui-background` | Optional background layer (image or gradient). |
| `.instui-content` | Container for hero text and actions. |
| `.instui-overlay` | Optional semi-transparent overlay for text contrast. |
| `.instui-subtitle` | Optional supporting text or description. |
| `.instui-title` | Main hero title (typically `&lt;h1&gt;`). |

## 의사 요소

| 의사 요소 | 설명 |
| --- | --- |
| `::before` | — |

## 상태

| 상태 | 설명 |
| --- | --- |
| `:optional` | — |

## 사용된 토큰

| 토큰 | 타입 | 값 |
| --- | --- | --- |
| `--instui-color-primary-background` | — | — |
| `--instui-font-size-hero` | `<length>` | — |
| `--instui-font-size-large` | `<length>` | — |
| `--instui-font-weight-bold` | — | — |
| `--instui-space-large` | — | — |
| `--instui-space-medium` | — | — |

## 관련 항목

- [card](/ko/api/css/card.md)

