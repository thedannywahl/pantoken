# CSS: hero

`div[class~="instui-hero"]` — Full-width header section with title, subtitle, and optional background image.

✅ Use Hero when:

- You need a prominent page header with visual hierarchy
- The page benefits from a large, eye-catching opening section
- You want to include background imagery or gradient accents
🚫 Don't use Hero when:

- Building a simple page header — use Page-Layout instead
- The hero competes with critical content — prioritize readability

## 無障礙

- Ensure the title is in an `&lt;h1&gt;` tag for semantic structure
- If using background images, provide sufficient color contrast for text
- Avoid autoplay on video or animation that could distract from content

## 使用方法

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## 插槽

| 插槽 | 說明 |
| --- | --- |
| `subtitle` | Hero subtitle content |
| `title` | Hero title content |

## 部件

| 部件 | 說明 |
| --- | --- |
| `.instui-actions` | Optional action buttons or links. |
| `.instui-background` | Optional background layer (image or gradient). |
| `.instui-content` | Container for hero text and actions. |
| `.instui-overlay` | Optional semi-transparent overlay for text contrast. |
| `.instui-subtitle` | Optional supporting text or description. |
| `.instui-title` | Main hero title (typically `&lt;h1&gt;`). |

## 偽元素

| 偽元素 | 說明 |
| --- | --- |
| `::before` | — |

## 狀態

| 狀態 | 說明 |
| --- | --- |
| `:optional` | — |

## 已使用的代幣

| 代幣 | 型別 | 值 |
| --- | --- | --- |
| `--instui-color-primary-background` | — | — |
| `--instui-font-size-hero` | `<length>` | — |
| `--instui-font-size-large` | `<length>` | — |
| `--instui-font-weight-bold` | — | — |
| `--instui-space-large` | — | — |
| `--instui-space-medium` | — | — |

## 相關

- [card](/zh-Hant/api/css/card.md)

