# CSS: drawer-layout.tray

`.tray` — The side panel beside main content, with optional overlay and tray-like surface modifiers.

Positioning uses `inset-inline-start`/`inset-inline` (never `left`/`right`), so `-placement-end` docks to the true trailing edge in both LTR and RTL.

## 접근성

If used as navigation, wrap links in a semantic `&lt;nav&gt;` and provide an accessible name.

## 사용법

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/drawer-layout.tray.css";
```

## 예제들

```html
<div class="instui-drawer-layout" open>
  <aside class="tray" aria-label="Course navigation">
    <a class="instui-link" href="#">Modules</a>
  </aside>
  <main class="content" role="region">Main content</main>
</div>
```

## 구조

```text
@scope (@component drawer-layout)
  .tray
    ‹content›
```

```mermaid
flowchart TD
  subgraph sg0 ["@scope (@component drawer-layout)"]
  n1(".tray"):::cssdoc-part
  n2[/"‹content›"/]:::cssdoc-slot
  end
  n1 --> n2
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## 수정자

| 수정자 | 설명 |
| --- | --- |
| `.-placement-end` | Dock this tray to inline-end when overlay mode is active. |
| `.-without-border` | Remove the panel edge border. |
| `.-without-shadow` | Remove elevation when overlay mode is active. |

## 조건

| 타입 | 쿼리 | 설명 |
| --- | --- | --- |
| container | `pantoken-drawer-layout (max-width: 46em)` | — |

## 사용된 토큰

| 토큰 | 타입 | 값 |
| --- | --- | --- |
| `--drawer-layout-tray-width` | — | — |
| `--instui-border-width-sm` | `<length>` | `0.0625rem` |
| `--instui-color-background-elevated-surface-base` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-color-stroke-base` | `<color>` | `light-dark(#8D959F, #6A7883)` |
| `--instui-component-tray-width-xs` | `<length>` | `16em` |
| `--instui-component-tray-z-index` | `<integer>` | `9999` |
| `--instui-elevation-topmost` | `none \| <shadow>#` | — |

## 관련 항목

- [drawer-layout.content](/ko/api/css/drawer-layout.content.md) — The primary pane that flexes alongside this member.

