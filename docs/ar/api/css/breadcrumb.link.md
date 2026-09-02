# CSS: breadcrumb.link

`li` · <span class="instui-pill -color-success pantoken-doc-tag">stable</span> — فتات (InstUI `Breadcrumb.Link`), `&lt;li&gt;` في `&lt;ol&gt;` الخاصة بالوالد؛ الأخير هو الصفحة الحالية.

معدِّلات `-size-sm`/`-size-lg` الخاصة بـ `breadcrumb` للوالد تضبط تباعد الفاصل لهذا العنصر — راجع توثيق `breadcrumb` نفسه لتلك المعدّلات.

## سهولة الوصول

وَسِّم فتات الصفحة الحالية بـ `aria-current="page"` — على `&lt;a&gt;` إذا كانت رابطًا، وإلا فعلى `&lt;li&gt;` نفسه.

## الاستخدام

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/breadcrumb.link.css";
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.-size-large` | اسم مرادف مطوّل لـ `-size-lg`. |
| `.-size-medium` | اسم بديل طويل لـ `-size-md`. |
| `.-size-small` | اسم مرادف مطوّل لـ `-size-sm`. |

## عناصر زائفة

| عنصر زائف | الوصف |
| --- | --- |
| `::after` | يعرض فاصل السهم (chevron) بعد كل فتات ما عدا الأخير؛ يعكس إلى `chevron-left` في `[dir="rtl"]`. |
| `::before` | في عنصر أب مطوّي، يرسم سهمًا للعودة مع قناع قبل الرابط قبل الأخير لهذا الفتات. |

## الشروط

| نوع | استعلام | الوصف |
| --- | --- | --- |
| media | `(max-width: 47.9375em)` | — |
| media | `(--breakpoint-large-down)` | يطيّيق المسار، ويعرض فقط الفتات السابق وسهم العودة. |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-color-text-muted` | `<color>` | `light-dark(#576773, #AAB0B5)` |
| `--instui-component-breadcrumb-gap-lg` | `<length>` | `0.5rem` |
| `--instui-component-breadcrumb-gap-md` | `<length>` | `0.25rem` |
| `--instui-component-breadcrumb-gap-sm` | `<length>` | `0.125rem` |
| `--instui-component-link-text-color` | `<color>` | `light-dark(#2369A4, #7FB4F1)` |
| `--instui-component-link-text-hover-color` | `<color>` | `light-dark(#1A5281, #ACCDF7)` |
| `--instui-icon-chevron-left` | `<image>` | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m15%2018-6-6%206-6%22%2F%3E%3C%2Fsvg%3E')` |
| `--instui-icon-chevron-right` | `<image>` | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m9%2018%206-6-6-6%22%2F%3E%3C%2Fsvg%3E')` |
| `--instui-spacing-space2xs` | `<length>` | `0.125rem` |

