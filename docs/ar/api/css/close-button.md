# CSS: close-button

`.instui-close-button` — زر أيقونة شفاف يرسم رمز × الخاص به، بثلاثة أحجام بالإضافة إلى متغير عكسي.

يتم عرضه دائمًا كعنصر تحكم أيقونة فقط بدون تسمية مرئية، لذا فإن `aria-label` مطلوب وليس اختياريًا؛ قارن مع متغير الشبح `-without-background` في `button`، الذي يحتفظ بتسمية نصية.

**المصدر:** [close-button.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/close-button/close-button.css)

<!-- js-requirement -->
> [!TIP]
> **تحسين JS** — يُقدِّم CSS الخاص بهذا المكوّن العرض والوظيفة بمفرده؛ اقترنه بـ `@pantoken/interactions` لإضافة السلوك التفاعلي. راجع [جدول المعدِّلات أدناه](#modifiers).


## سهولة الوصول

امنح زر الأيقونة فقط `aria-label` (مثال: "إغلاق").

## الاستخدام

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/close-button.css";
```

## أمثلة

```html
<button class="instui-close-button -size-sm" aria-label="Close"></button>
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.-color-inverse` | لخلفيات داكنة. |
| `.-size-large` | كبير. تسمية مطوّلة لـ `-size-lg`. |
| `.-size-lg` | كبير. |
| `.-size-sm` | صغير. |
| `.-size-small` | صغير. تسمية مطوّلة لـ `-size-sm`. |

## عناصر زائفة

| عنصر زائف | الوصف |
| --- | --- |
| `::before` | رمز ×، مُقنّع في `currentColor`. |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-color-background-interactive-action-tertiary-active` | `<color>` | `light-dark(#E2EAF7, #234465)` |
| `--instui-color-background-interactive-action-tertiary-hover` | `<color>` | `light-dark(#EEF4FD, #2E5177)` |
| `--instui-color-text-interactive-action-secondary-base` | `<color>` | `light-dark(#1D354F, #ffffff)` |
| `--instui-component-base-button-border-radius` | `<length>` | `0.75rem` |
| `--instui-component-base-button-large-height` | `<length>` | `3rem` |
| `--instui-component-base-button-medium-height` | `<length>` | `2.5rem` |
| `--instui-component-base-button-primary-inverse-ghost-color` | `<color>` | `#ffffff` |
| `--instui-component-base-button-small-height` | `<length>` | `2rem` |
| `--instui-icon-x` | `<image>` | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M18%206%206%2018%22%2F%3E%3Cpath%20d%3D%22m6%206%2012%2012%22%2F%3E%3C%2Fsvg%3E')` |
| `--instui-spacing-space-xs` | `<length>` | `0.25rem` |

## ذات صلة

- [button](/ar/api/css/button.md) — زر إجراء عام الاستخدام.

