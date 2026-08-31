# CSS: drawer-layout.tray

`.tray` — لوحة جانبية بجانب المحتوى الرئيسي، مع تراكب اختياري ومعدلات سطح تشبه الدرج.

يستخدم التموضع `inset-inline-start`/`inset-inline` (لا `left`/`right` أبداً)، لذا يرسو `-placement-end` على الحافة الزائدة الحقيقية في LTR و RTL.

## Accessibility

إذا تم استخدامه كملاحة، قم بلف الروابط في `&lt;nav&gt;` دلالي وقدم اسماً يمكن الوصول إليه.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/drawer-layout.tray.css";
```

## Examples

```html
<div class="instui-drawer-layout" open>
  <aside class="tray" aria-label="Course navigation">
    <a class="instui-link" href="#">Modules</a>
  </aside>
  <main class="content" role="region">Main content</main>
</div>
```

## Structure

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

## Modifiers

| Modifier           | Description                                            |
| ------------------ | ------------------------------------------------------ |
| `.-placement-end`  | إرساء هذا الدرج إلى نهاية السطر عند تفعيل وضع التراكب. |
| `.-without-border` | إزالة حد حافة اللوحة.                                  |
| `.-without-shadow` | إزالة الارتفاع عند تفعيل وضع التراكب.                  |

## Conditions

| Type      | Query                                      | Description |
| --------- | ------------------------------------------ | ----------- |
| container | `pantoken-drawer-layout (max-width: 46em)` | —           |

## Tokens consumed

| Token                                             | Type                | Value                          |
| ------------------------------------------------- | ------------------- | ------------------------------ |
| `--drawer-layout-tray-width`                      | —                   | —                              |
| `--instui-border-width-sm`                        | `<length>`          | `0.0625rem`                    |
| `--instui-color-background-elevated-surface-base` | `<color>`           | `light-dark(#ffffff, #171B21)` |
| `--instui-color-stroke-base`                      | `<color>`           | `light-dark(#8D959F, #6A7883)` |
| `--instui-component-tray-width-xs`                | `<length>`          | `16em`                         |
| `--instui-component-tray-z-index`                 | `<integer>`         | `9999`                         |
| `--instui-elevation-topmost`                      | `none \| <shadow>#` | —                              |

## Related

- [drawer-layout.content](/ar/api/css/drawer-layout.content.md) — الجزء الأساسي الذي ينحني إلى جانب هذا العضو.
