# CSS: banner

`.instui-banner` · `alpha` — سطح رسالة قابل للإغلاق مع أيقونة للإعلانات على مستوى الصفحة أو في السياق.

**الحجم** يتحكم في الحشوة والفجوة: `relaxed` (الافتراضي) أكثر اتساعًا؛ `compact` يُضيِّق كلاهما.
  **اللون** يحدد التعبئة: النمط العاري (بدون مُعدِّل) غير مملوء — الحد والأيقونة فقط؛ `-color-violet`
  و `-color-sea` يضيفان خلفية ملوَّنة ونقشة أيقونة متطابقة.

## سهولة الوصول

أضف `role="status"` (أو `role="alert"` للرسائل العاجلة) لكي تعلن تقنيات المساعدة عن الشريط؛ علّم الأيقونة الزخرفية بـ `aria-hidden="true"` وأعط زر الإغلاق `aria-label`.

## الاستخدام

@import "@pantoken/plugin-custom-components/custom-components.css";

```css
@import "@pantoken/plugin-custom-components/custom-components.css";
```

## أمثلة

-nocard
```html
<div class="instui-banner -icon-canvas-icon-reversed" role="status">
  <h2 class="instui-heading">New feature</h2>
  <span class="instui-text">This is a violet banner with a custom icon.</span>
  <div class="instui-view --display-flex --gap-md">
    <button class="instui-button">OK</button>
    <button class="instui-button">Cancel</button>
  </div>
  <button class="instui-close-button" aria-label="Close"></button>
</div>
```
### Sea colored and compact spacing -nocard
```html
<div class="instui-banner -color-sea -size-sm" role="status">
  This is a sea-colored banner with compact spacing.
</div>
```

## الهيكل

```text
.instui-banner
  heading (component, 0..1)
  ‹content›
  close-button (component, 0..1)
```

```mermaid
flowchart TD
  n0[".instui-banner"]:::cssdoc-root
  n1(["heading"]):::cssdoc-component
  n2[/"‹content›"/]:::cssdoc-slot
  n3(["close-button"]):::cssdoc-component
  n0 -.->|0..1| n1
  n0 --> n2
  n0 -.->|0..1| n3
  click n1 "/api/css/heading.md"
  click n3 "/api/css/close-button.md"
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.-color-sea` | خلفية ونعومة أيقونة بدرجة لون بحرية. |
| `.-color-violet` | خلفية ونعومة أيقونة بدرجة لون بنفسجية. |
| `.-icon-*` | استبدِل شكل `info` الافتراضي بأيقونة من مجموعة الأيقونات المشتركة (على سبيل المثال، `-icon-megaphone`). |
| `.-size-compact` | حشوة وفجوة أضيق. |
| `.-size-md` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-size-relaxed`. |
| `.-size-relaxed` | حشوة وفجوة أوسع (الافتراضي). |
| `.-size-sm` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-size-compact`. |

## عناصر زائفة

| عنصر زائف | الوصف |
| --- | --- |
| `::after` | — |
| `::before` | — |

## الحالات

| حالة | الوصف |
| --- | --- |
| `[aria-disabled="true"]` | — |
| `:disabled` | — |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-color-background-interactive-action-primary-on-color-active` | `<color>` | `#B6CCEA` |
| `--instui-color-background-interactive-action-primary-on-color-base` | `<color>` | `#ffffff` |
| `--instui-color-background-interactive-action-primary-on-color-disabled` | `<color>` | `#8D959F` |
| `--instui-color-background-interactive-action-primary-on-color-hover` | `<color>` | `#D5E2F6` |
| `--instui-color-stroke-interactive-action-primary-on-color-active` | `<color>` | `#B6CCEA` |
| `--instui-color-stroke-interactive-action-primary-on-color-base` | `<color>` | `#ffffff` |
| `--instui-color-stroke-interactive-action-primary-on-color-disabled` | `<color>` | `#8D959F` |
| `--instui-color-stroke-interactive-action-primary-on-color-hover` | `<color>` | `#D5E2F6` |
| `--instui-color-text-interactive-action-primary-on-color-active` | `<color>` | `#213D5B` |
| `--instui-color-text-interactive-action-primary-on-color-base` | `<color>` | `#213D5B` |
| `--instui-color-text-interactive-action-primary-on-color-disabled` | `<color>` | `#4A5B68` |
| `--instui-color-text-interactive-action-primary-on-color-hover` | `<color>` | `#213D5B` |
| `--instui-component-banner-border-color` | `<color>` | `#5F6E7A1A` |
| `--instui-component-banner-border-radius` | `<length>` | `1rem` |
| `--instui-component-banner-border-style` | — | `solid` |
| `--instui-component-banner-border-width` | `<length>` | `0.0625rem` |
| `--instui-component-banner-close-button-margin-right` | `<length>` | `0.5rem` |
| `--instui-component-banner-close-button-margin-top` | `<length>` | `0.5rem` |
| `--instui-component-banner-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-banner-compact-content-gap-horizontal` | `<length>` | `0.5rem` |
| `--instui-component-banner-compact-icon-border-radius` | `<length>` | `0.5rem` |
| `--instui-component-banner-compact-padding-horizontal` | `<length>` | `0.75rem` |
| `--instui-component-banner-compact-padding-vertical` | `<length>` | `0.75rem` |
| `--instui-component-banner-content-gap-vertical` | `<length>` | `0.75rem` |
| `--instui-component-banner-icon-color` | `<color>` | `#ffffff` |
| `--instui-component-banner-relaxed-content-gap-horizontal` | `<length>` | `1rem` |
| `--instui-component-banner-relaxed-icon-border-radius` | `<length>` | `0.75rem` |
| `--instui-component-banner-relaxed-padding-horizontal` | `<length>` | `1.5rem` |
| `--instui-component-banner-relaxed-padding-vertical` | `<length>` | `1.5rem` |
| `--instui-component-banner-sea-background` | `<color>` | `light-dark(#CFF0F6, #00424A)` |
| `--instui-component-banner-sea-icon-background` | `<color>` | `#00828E` |
| `--instui-component-banner-violet-background` | `<color>` | `light-dark(#F3E5F7, #522965)` |
| `--instui-component-banner-violet-icon-background` | `<color>` | `#9E58BD` |
| `--instui-component-base-button-medium-height` | `<length>` | `2.5rem` |
| `--instui-component-base-button-small-font-size` | `<length>` | `0.875rem` |
| `--instui-component-base-button-small-height` | `<length>` | `2rem` |
| `--instui-component-base-button-small-padding-horizontal` | `<length>` | `0.75rem` |
| `--instui-component-heading-title-card-mini-font-size` | `<length>` | `1rem` |
| `--instui-component-heading-title-card-mini-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-title-card-regular-font-size` | `<length>` | `1.25rem` |
| `--instui-component-heading-title-card-regular-font-weight` | `<integer>` | `700` |
| `--instui-component-text-content-font-size` | `<length>` | `1rem` |
| `--instui-component-text-content-font-weight` | `<integer>` | `400` |
| `--instui-component-text-content-line-height` | `<percentage>` | `150%` |
| `--instui-component-text-content-small-font-size` | `<length>` | `0.875rem` |
| `--instui-component-text-content-small-font-weight` | `<integer>` | `400` |
| `--instui-component-text-content-small-line-height` | `<percentage>` | `150%` |
| `--instui-font-size-text-base` | `<length>` | `1rem` |
| `--instui-icon-megaphone` | `<image>` | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M11%206a13%2013%200%200%200%208.4-2.8A1%201%200%200%201%2021%204v12a1%201%200%200%201-1.6.8A13%2013%200%200%200%2011%2014H5a2%202%200%200%201-2-2V8a2%202%200%200%201%202-2z%22%2F%3E%3Cpath%20d%3D%22M6%2014a12%2012%200%200%200%202.4%207.2%202%202%200%200%200%203.2-2.4A8%208%200%200%201%2010%2014%22%2F%3E%3Cpath%20d%3D%22M8%206v8%22%2F%3E%3C%2Fsvg%3E')` |
| `--instui-line-height-standalone-text-base` | `<length>` | `1rem` |
| `--pantoken-banner-close-button-reserve` | `<length>` | `0rem` |
| `--pantoken-banner-glyph` | `<url>` | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M11%206a13%2013%200%200%200%208.4-2.8A1%201%200%200%201%2021%204v12a1%201%200%200%201-1.6.8A13%2013%200%200%200%2011%2014H5a2%202%200%200%201-2-2V8a2%202%200%200%201%202-2z%22%2F%3E%3Cpath%20d%3D%22M6%2014a12%2012%200%200%200%202.4%207.2%202%202%200%200%200%203.2-2.4A8%208%200%200%201%2010%2014%22%2F%3E%3Cpath%20d%3D%22M8%206v8%22%2F%3E%3C%2Fsvg%3E')` |
| `--pantoken-banner-icon-background` | `<color>` | `#9E58BD` |
| `--pantoken-banner-icon-inset-block-start` | `<length>` | `1.5rem` |
| `--pantoken-banner-icon-inset-inline-start` | `<length>` | `1.5rem` |
| `--pantoken-banner-icon-size` | `<length>` | `2rem` |
| `--pantoken-glyph` | `<url>` | `url("data:image/svg+xml` |

## مكونات فرعية

- [close-button](/ar/api/css/close-button.md)
- [heading](/ar/api/css/heading.md)

## ذات صلة

- [alert](/ar/api/css/alert.md) — نظير غير قابل للإغلاق وملوَّن بالحالة للرسائل المضمَّنة.
- [close-button](/ar/api/css/close-button.md) — عنصر التحكم بالإغلاق الذي قد يشمله الشريط.

