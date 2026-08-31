# CSS: drawer-layout.content

`.content` — جزء المحتوى الرئيسي الذي يملأ المساحة المتبقية بجانب الدرج.

عندما ينخفض حجم العنصر الأب بالخط أقل من `46em` (عرض الدرج `16em` + نقطة التوقف `30em`)، سيؤدي استعلام `@container` على حاوية `pantoken-drawer-layout` الخاصة بالعنصر الأب إلى إسقاط `min-inline-size` لهذا العضو إلى `0` تلقائياً، مطابقاً لاستبدال `[should-overlay-tray]` اليدوي.

## Accessibility

احمل `role="region"` (اتفاقية InstUI's DrawerLayout) وسمه باستخدام `aria-label`/`aria-labelledby` عندما لا يحدد السياق وحده.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/drawer-layout.content.css";
```

## Examples

```html
<div class="instui-drawer-layout">
  <div class="content" role="region">
    <p class="instui-text">Tray content</p>
  </div>
</div>
```

## Structure

```text
@scope (@component drawer-layout)
  .content
    ‹content›
```

```mermaid
flowchart TD
  subgraph sg0 ["@scope (@component drawer-layout)"]
  n1(".content"):::cssdoc-part
  n2[/"‹content›"/]:::cssdoc-slot
  end
  n1 --> n2
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## Conditions

| Type      | Query                                      | Description |
| --------- | ------------------------------------------ | ----------- |
| container | `pantoken-drawer-layout (max-width: 46em)` | —           |

## Tokens consumed

| Token                                     | Type       | Value  |
| ----------------------------------------- | ---------- | ------ |
| `--drawer-layout-content-min-inline-size` | `<length>` | —      |
| `--pantoken-bp-md`                        | `<length>` | `30em` |

## Related

- [drawer-layout.tray](/ar/api/css/drawer-layout.tray.md) — لوحة مجاورة في نفس صف flex.
