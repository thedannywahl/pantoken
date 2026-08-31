# CSS: drawer-layout

`.instui-drawer-layout` — تخطيط منقسم مع درج جانبي قابل للطي وجزء محتوى قابل للتمرير الأساسي.

`-placement-end` والافتراضي (البداية) كلاهما يستخدم الخصائص المنطقية `flex-direction`/`inset-inline-*`، وليس `left`/`right`، لذا يتبع جانب الدرج `direction`/`dir="rtl"` تلقائياً — لا توجد قواعد RTL منفصلة مطلوبة.

**المصدر:** [drawer-layout.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/drawer-layout/drawer-layout.css)

## Accessibility

عندما يعمل الدرج كملاحة، قم بتسميته بعنوان يمكن الوصول إليه أو `aria-label`. امنح `.content` `role="region"` (اتفاقية InstUI's DrawerLayout) وسمه باستخدام `aria-label`/`aria-labelledby` عندما لا يحدد السياق وحده.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/drawer-layout.css";
```

## Examples

```html
<div class="instui-drawer-layout" id="drawer" open>
  <aside class="tray">Navigation</aside>
  <main class="content" role="region">Main content</main>
</div>
```

## Structure

```text
.instui-drawer-layout
  drawer-layout.tray (component)
  drawer-layout.content (component)
```

```mermaid
flowchart TD
  n0[".instui-drawer-layout"]:::cssdoc-root
  n1(["drawer-layout.tray"]):::cssdoc-component
  n2(["drawer-layout.content"]):::cssdoc-component
  n0 --> n1
  n0 --> n2
  click n1 "/api/css/drawer-layout.tray.md"
  click n2 "/api/css/drawer-layout.content.md"
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## Modifiers

| Modifier                | Description                                                                                                                                                     |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.-open`                | عرض الدرج حتى عند غياب السمة `open`.                                                                                                                            |
| `.-placement-end`       | إرساء الدرج على جانب نهاية السطر.                                                                                                                               |
| `.-placement-start`     | إرساء الدرج على جانب بداية السطر (الافتراضي؛ يعينه بوضوح).                                                                                                      |
| `.-should-overlay-tray` | <span class="instui-pill pantoken-doc-tag pantoken-doc-tag-interaction">Interaction</span> — Render the tray as an overlay instead of shrinking content inline. |

## Parts

| Part       | Description    |
| ---------- | -------------- |
| `.content` | الجزء الرئيسي. |
| `.tray`    | لوحة جانبية.   |

## Custom properties

| Property           | Type | Default | Description                                                 |
| ------------------ | ---- | ------- | ----------------------------------------------------------- |
| `--pantoken-bp-md` | —    | —       | حد عرض وضع التراكب (`30em`، موضوع من خلال أدوات الاستجابة). |

## Browser support

- ينتقل الأعضاء `drawer-layout.tray`/`drawer-layout.content` إلى وضع التراكب تلقائياً عبر استعلام `@container` بمجرد انخفاض حجم السطر لهذا العنصر عن عرض الدرج + `--pantoken-bp-md`. يقوم السلوك `@pantoken/interactions` بالتبديل الإضافي لـ `[should-overlay-tray]`/`.-should-overlay-tray` (استبدال يدوي) وإصدار `overlaytraychange` للتطبيقات التي تحتاج إلى التغيير كحدث.

## Subcomponents

- [drawer-layout.content](/ar/api/css/drawer-layout.content.md)
- [drawer-layout.tray](/ar/api/css/drawer-layout.tray.md)
- [tray](/ar/api/css/tray.md)

## Related

- [tray](/ar/api/css/tray.md) — تراكب حافة مستقل؛ يحافظ هذا التخطيط على الدرج والمحتوى في نفس التدفق.
- [context-view](/ar/api/css/context-view.md) — سطح مرساة أصغر للإجراءات السياقية والتفاصيل.
