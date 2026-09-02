# CSS: callout

`div[class~="instui-callout"]` — Inline information alert for a short reminder or note.

✅ Use Callout when:

- You need to highlight important information or reminders inline
- The message is relatively brief (a sentence to a short paragraph)
- The alert should draw attention without interrupting the main flow
🚫 Don't use Callout when:

- The message requires interaction or multiple actions — use a Modal or Alert Dialog
- The content is the main focus of the page — use a Card or Hero layout instead

## Khả năng truy cập

- Ensure the alert role is properly applied (role="alert" or role="status")
- Use semantic color contrast that meets WCAG AA standards
- Don't rely on color alone to convey meaning

## Sử dụng

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Các slot

| Slot | Mô tả |
| --- | --- |
| `message` | Alert message content |

## Phần

| Phần | Mô tả |
| --- | --- |
| `.instui-content` | Container for the text content. |
| `.instui-icon` | Optional icon to the left of the content. |

## Phần tử giả

| Phần tử giả | Mô tả |
| --- | --- |
| `::before` | — |

## Trạng thái

| Trạng thái | Mô tả |
| --- | --- |
| `:optional` | — |

## Token tiêu thụ

| Token | Kiểu | Giá trị |
| --- | --- | --- |
| `--instui-color-info-background` | — | — |
| `--instui-color-info-border` | — | — |
| `--instui-color-info-text` | — | — |
| `--instui-radius-medium` | — | — |
| `--instui-size-small` | `<length>` | — |
| `--instui-space-medium` | — | — |
| `--instui-space-small` | — | — |

## Liên quan

- [alert](/vi/api/css/alert.md)

