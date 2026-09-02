# CSS: context-view

`.instui-context-view` — شارة منبّهة مرتفعة مع مثلث صغير (caret)، قابلة للتموضع على أي جانب؛ تعمل كـ `[popover]` أصلية.

المثلث الصغير مكوّن من مثلثين مكدَّسين `::before`/`::after` (حد ثم تعبئة) حتى يظهر بشكل صحيح على سطح مطابق؛ بوصفه `[popover]` يحتاج نفس توصيلات open/`popovertarget` مثل `popover`، لكن على عكس `tooltip`، يتم إغلاقه عند النقر بالخارج أو بالضغط على Escape.

**المصدر:** [context-view.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/context-view/context-view.css)

## الاستخدام

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/context-view.css";
```

## أمثلة

```html
<div class="instui-context-view -placement-bottom" id="cv-popover">A context view frames a callout with a caret. As a popover it rides the top layer and closes when you click away or press Esc.</div>
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.-color-inverse` | نظام ألوان داكن (عكسي). |
| `.-placement-bottom` | الجلوس أسفل المرساة. |
| `.-placement-end` | الجلوس عند النهاية (inline-end) من المرساة. |
| `.-placement-start` | الجلوس عند البداية (inline-start) من المرساة. |
| `.-placement-top` | الجلوس فوق المرساة. |

## عناصر زائفة

| عنصر زائف | الوصف |
| --- | --- |
| `::after` | يعرض مثلث التعبئة الداخلي للمثلث الصغير (caret). |
| `::before` | يعرض مثلث الحدود الخارجي للمثلث الصغير (caret). |

## الحالات

| حالة | الوصف |
| --- | --- |
| `:state(open)` | — |

## الشروط

| نوع | استعلام | الوصف |
| --- | --- | --- |
| supports | `(position-area: block-end)` | — |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-color-background-elevated-surface-base` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-color-background-inverse` | `<color>` | `light-dark(#334450, #F2F4F5)` |
| `--instui-color-text-base` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-color-text-inverse` | `<color>` | `light-dark(#ffffff, #1C222B)` |
| `--instui-component-context-view-arrow-background-color` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-context-view-arrow-background-color-inverse` | `<color>` | `light-dark(#334450, #F2F4F5)` |
| `--instui-component-context-view-arrow-border-color` | `<color>` | `light-dark(#E8EAEC, #2D3D49)` |
| `--instui-component-context-view-arrow-border-color-inverse` | `<color>` | `#00000000` |
| `--instui-component-context-view-arrow-border-width` | `<length>` | `0.0625rem` |
| `--instui-component-context-view-arrow-size` | `<length>` | `0.5rem` |
| `--instui-component-context-view-border-radius` | `<length>` | `0.75rem` |
| `--instui-elevation-above` | `none \| <shadow>#` | — |
| `--instui-spacing-space-lg` | `<length>` | `1rem` |
| `--instui-spacing-space-md` | `<length>` | `0.75rem` |

## دعم المتصفّح

- يستخدم موضعية الـ CSS للمرساة (`position-anchor`, `position-area`, `position-try-fallbacks`) وواجهة برمجة التطبيقات الأصلية `[popover]` خلف حارس `@supports`; يتطلب نسخة حديثة من Chromium أو Safari، ويتراجع إلى مظهر منبثق متمركز من متصفح المستخدم في المتصفحات الأخرى.

## ذات صلة

- [popover](/ar/api/css/popover.md) — نافذة منبثقة عامة على الطبقة العليا.
- [tooltip](/ar/api/css/tooltip.md) — شارة أصغر للمرور (hover) أو التركيز.

