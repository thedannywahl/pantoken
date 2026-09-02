# CSS: page-layout

`div[class~="instui-page-layout"]` — Standard three-column page layout with header, sidebar, and main content.

✅ Use Page-Layout when:

- You need a classic page structure with navigation and content areas
- The page has a clear main content area flanked by complementary regions
- You want consistent spacing and alignment across the layout
🚫 Don't use Page-Layout when:

- Building a single-column page — use a simpler layout instead
- The sidebar competes with main content for importance

## 접근성

- Map the main content area to a `&lt;main&gt;` landmark
- Give the sidebar `role="navigation"` or `role="complementary"` as appropriate
- Ensure landmark regions have distinct aria-labels

## 사용법

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## 부분

| 부분 | 설명 |
| --- | --- |
| `.instui-body` | Main body containing sidebar and content. |
| `.instui-footer` | Bottom footer region. |
| `.instui-header` | Top header region. |
| `.instui-main` | Central content area. |
| `.instui-sidebar` | Left navigation or auxiliary column. |

## 상태

| 상태 | 설명 |
| --- | --- |
| `:optional` | — |

## 사용된 토큰

| 토큰 | 타입 | 값 |
| --- | --- | --- |
| `--instui-color-border` | — | — |
| `--instui-color-footer-background` | — | — |
| `--instui-color-footer-text` | — | — |
| `--instui-color-header-background` | — | — |
| `--instui-color-sidebar-background` | — | — |
| `--instui-font-size-small` | `<length>` | — |
| `--instui-space-medium` | — | — |

## 관련 항목

- [wrapper](/ko/api/css/wrapper.md)

