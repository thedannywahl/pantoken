# CSS: popover

`.instui-popover` — سطح مرتفع لـ `[popover]` أصلي، موضعه يتم باستخدام تموضع المرساة في CSS.

تموضع المرساة متاح في Chromium فقط؛ حارس `@supports` يعني أن `-placement-*` سيكون خاملاً بصمت في أماكن أخرى ويقوم وكيل المستخدم بمركزة البوبوفر في الطبقة العلوية بدلاً من فشل الوضع.

**المصدر:** [popover.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/popover/popover.css)

## الاستخدام

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/popover.css";
```

## أمثلة

```html
<div class="instui-popover -placement-bottom" id="pop-1">
  <div class="instui-heading -level-h4">Share this page</div>
  <p class="instui-text -size-sm">A popover is a lightweight surface anchored to a trigger. This one uses the native <code>popover</code> attribute.</p>
</div>
```

## الهيكل

```text
.instui-popover
  heading (component)
  text (component)
    code
```

```mermaid
flowchart TD
  n0[".instui-popover"]:::cssdoc-root
  n1(["heading"]):::cssdoc-component
  n2(["text"]):::cssdoc-component
  n3("code"):::cssdoc-part
  n0 --> n1
  n2 --> n3
  n0 --> n2
  click n1 "/api/css/heading.md"
  click n2 "/api/css/text.md"
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.-placement-bottom` | الجلوس أسفل المرساة. |
| `.-placement-end` | الجلوس عند النهاية (inline-end) من المرساة. |
| `.-placement-start` | الجلوس عند البداية (inline-start) من المرساة. |
| `.-placement-top` | الجلوس فوق المرساة. |

## الشروط

| نوع | استعلام | الوصف |
| --- | --- | --- |
| supports | `(position-area: block-end)` | — |
| supports | `(transition-behavior: allow-discrete)` | — |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-border-width-sm` | `<length>` | `0.0625rem` |
| `--instui-color-background-elevated-surface-base` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-color-text-base` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-popover-border-color` | `<color>` | `light-dark(#8D959F, #6A7883)` |
| `--instui-component-popover-border-radius` | `<length>` | `0.75rem` |
| `--instui-elevation-above` | `none \| <shadow>#` | — |
| `--instui-spacing-space-sm` | `<length>` | `0.5rem` |

## دعم المتصفّح

- يستخدم تموضع المرساة في CSS (`position-anchor`/`position-area`) وواجهة برمجة التطبيقات `[popover]` الأصلية، وكلاهما متاحان في Chromium فقط اليوم؛ حارس `@supports` يجعل الموضع خاملاً في أماكن أخرى حيث يقوم وكيل المستخدم بمركزة البوبوفر في الطبقة العلوية.

## مكونات فرعية

- [heading](/ar/api/css/heading.md)
- [text](/ar/api/css/text.md)

## ذات صلة

- [tooltip](/ar/api/css/tooltip.md) — التولتيب هو سطح مرساة أصغر يتم تفعيله بالتحويم أو بالتركيز.
- [context-view](/ar/api/css/context-view.md) — عرض السياق هو سطح مرساة ذي صلة مزود بمؤشر.

