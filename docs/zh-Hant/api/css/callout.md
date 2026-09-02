# CSS: callout

`div[class~="instui-callout"]` — Inline information alert for a short reminder or note.

✅ Use Callout when:

- You need to highlight important information or reminders inline
- The message is relatively brief (a sentence to a short paragraph)
- The alert should draw attention without interrupting the main flow
🚫 Don't use Callout when:

- The message requires interaction or multiple actions — use a Modal or Alert Dialog
- The content is the main focus of the page — use a Card or Hero layout instead

## 無障礙

- Ensure the alert role is properly applied (role="alert" or role="status")
- Use semantic color contrast that meets WCAG AA standards
- Don't rely on color alone to convey meaning

## 使用方法

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## 插槽

| 插槽 | 說明 |
| --- | --- |
| `message` | Alert message content |

## 部件

| 部件 | 說明 |
| --- | --- |
| `.instui-content` | Container for the text content. |
| `.instui-icon` | Optional icon to the left of the content. |

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
| `--instui-color-info-background` | — | — |
| `--instui-color-info-border` | — | — |
| `--instui-color-info-text` | — | — |
| `--instui-radius-medium` | — | — |
| `--instui-size-small` | `<length>` | — |
| `--instui-space-medium` | — | — |
| `--instui-space-small` | — | — |

## 相關

- [alert](/zh-Hant/api/css/alert.md)

