# CSS: rubric-note

`div[class~="instui-rubric-note"]` — Structured note with rubric categories and scoring indicators.

✅ Use Rubric-Note when:

- Displaying grading rubric or assessment criteria
- You need to structure content by category with scores or indicators
- The layout should emphasize structure and hierarchy
🚫 Don't use Rubric-Note when:

- Displaying simple notes or comments — use Callout instead
- Complex grading logic is needed — consider a custom component

## 无障碍

- Use table semantics if displaying a true rubric with rows and columns
- Ensure score indicators are not color-only
- Provide descriptive labels for each category

## 用法

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## 部件

| 部件 | 描述 |
| --- | --- |
| `.instui-criteria` | Container for rubric criteria rows. |
| `.instui-description` | Detailed description of the criterion. |
| `.instui-header` | Header with title and metadata. |
| `.instui-name` | Criterion name or category. |
| `.instui-row` | Individual criterion row. |
| `.instui-score` | Score indicator or badge. |

## 状态

| 状态 | 描述 |
| --- | --- |
| `:optional` | — |

## 消耗代币

| 代币 | 类型 | 值 |
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

## 相关

- [card](/zh-Hans/api/css/card.md)

