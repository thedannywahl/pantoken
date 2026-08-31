# CSS: tray

`.instui-tray` — لوحة مثبتة على الحافة تنزلق من أي جانب؛ أصلية `[popover]` أو `&lt;dialog&gt;`.

تتحل عمليات البدء/النهاية ضد `inset-inline` (منطقي، واعي بالاتجاه)؛ تعكس تحويل الشريحة تلقائياً تحت سلف `[dir="rtl"]`، لذلك لا يتطلب تخطيط إضافي للتخطيطات من اليمين إلى اليسار.

**المصدر:** [tray.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/tray/tray.css)

## Accessibility

الدرج عبارة عن سطح حوار أو popover، لذا أطلق عليه اسم `aria-label` أو `aria-labelledby`، وتحمل أداة التحكم الخاصة به `aria-label` (`.instui-close-button` في المثال يستخدم `aria-label="Close"`).

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/tray.css";
```

## Examples

```html
<div class="instui-tray -placement-end -size-sm">
  <span class="instui-heading -level-h3">Filters</span>
  <p class="-size-sm">A tray slides in from the start edge and fills the viewport height.</p>
</div>
<button class="instui-button -toggle">toggle tray</button>
```

## Structure

```text
.instui-tray
  close-button (component, 0..1)
  ‹content›
```

```mermaid
flowchart TD
  n0[".instui-tray"]:::cssdoc-root
  n1(["close-button"]):::cssdoc-component
  n2[/"‹content›"/]:::cssdoc-slot
  n0 -.->|0..1| n1
  n0 --> n2
  click n1 "/api/css/close-button.md"
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## Modifiers

| Modifier             | Description                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------- |
| `.-placement-bottom` | اربط إلى الحافة السفلية.                                                                      |
| `.-placement-end`    | اربط إلى الحافة النهائية (inline-end).                                                        |
| `.-placement-start`  | (افتراضي) اربط إلى حافة البداية (inline-start).                                               |
| `.-placement-top`    | اربط إلى الحافة العليا.                                                                       |
| `.-size-large`       | كبير. اسم مستعار طويل الشكل لـ `-size-lg`.                                                    |
| `.-size-lg`          | كبير.                                                                                         |
| `.-size-md`          | (افتراضي) متوسط.                                                                              |
| `.-size-medium`      | (افتراضي) متوسط. اسم مستعار طويل `-size-md`.                                                  |
| `.-size-regular`     | <span class="instui-pill -color-danger pantoken-doc-tag">Deprecated</span> — use `.-size-md`. |
| `.-size-sm`          | صغير.                                                                                         |
| `.-size-small`       | صغير. اسم مستعار طويل الشكل لـ `-size-sm`.                                                    |
| `.-size-x-large`     | كبير جداً. اسم مستعار طويل الشكل لـ `-size-xl`.                                               |
| `.-size-x-small`     | صغير جداً. اسم مستعار طويل الشكل لـ `-size-xs`.                                               |
| `.-size-xl`          | كبير جداً.                                                                                    |
| `.-size-xs`          | صغير جداً.                                                                                    |

## Conditions

| Type     | Query                                   | Description |
| -------- | --------------------------------------- | ----------- |
| supports | `(transition-behavior: allow-discrete)` | —           |

## Tokens consumed

| Token                                      | Type                | Value                          |
| ------------------------------------------ | ------------------- | ------------------------------ |
| `--instui-component-tray-background-color` | `<color>`           | `light-dark(#ffffff, #1C222B)` |
| `--instui-component-tray-border-color`     | `<color>`           | `light-dark(#E8EAEC, #334450)` |
| `--instui-component-tray-border-width`     | `<length>`          | `0.0625rem`                    |
| `--instui-component-tray-padding`          | `<length>`          | `1.5rem`                       |
| `--instui-component-tray-width-lg`         | `<length>`          | `48em`                         |
| `--instui-component-tray-width-md`         | `<length>`          | `30em`                         |
| `--instui-component-tray-width-sm`         | `<length>`          | `20em`                         |
| `--instui-component-tray-width-xl`         | `<length>`          | `62em`                         |
| `--instui-component-tray-width-xs`         | `<length>`          | `16em`                         |
| `--instui-component-tray-z-index`          | `<integer>`         | `9999`                         |
| `--instui-elevation-topmost`               | `none \| <shadow>#` | —                              |
| `--tray-slide-x`                           | —                   | `-100%`                        |
| `--tray-slide-y`                           | —                   | `0%`                           |

## Browser support

- يفتح باستخدام API `[popover]` الأصلي و `@starting-style`؛ تجلس الشريحة خلف حارس `@supports (transition-behavior: allow-discrete)`، لذلك تفتح المتصفحات بدونها الدرج فقط بدون الشريحة.

## Subcomponents

- [close-button](/ar/api/css/close-button.md)

## Related

- [modal](/ar/api/css/modal.md) — نفس نمط الطبقة الفوقية القابلة للرفض، متمركزة بدلاً من أن تكون مثبتة على الحافة.
- [popover](/ar/api/css/popover.md) — السطح الجنريك من الطبقة العليا الذي يبني عليه.
