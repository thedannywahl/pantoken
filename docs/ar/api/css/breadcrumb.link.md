# CSS: breadcrumb.link

`li` · <span class="instui-pill -color-success pantoken-doc-tag">stable</span> — جزء (InstUI `Breadcrumb.Link`)، و`&lt;li&gt;` في `&lt;ol&gt;` للعنصر الأب؛ الأخير هو الصفحة الحالية.

معدّلات `-size-sm`/`-size-lg` للعنصر الأب `breadcrumb` تعدّل تباعد الفاصل لهذا العضو — انظر الوثائق الخاصة بـ `breadcrumb` لتلك المعدّلات.

## Accessibility

ضع علامة على جزء الصفحة الحالية بـ `aria-current="page"` — على `&lt;a&gt;` الخاص به إذا كان رابطًا، وإلا على `&lt;li&gt;` نفسه.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/breadcrumb.link.css";
```

## Modifiers

| Modifier        | Description                    |
| --------------- | ------------------------------ |
| `.-size-large`  | اسم مستعار طويل لـ `-size-lg`. |
| `.-size-medium` | اسم مستعار طويل لـ `-size-md`. |
| `.-size-small`  | اسم مستعار طويل لـ `-size-sm`. |

## Pseudo-elements

| Pseudo-element | Description                                                                               |
| -------------- | ----------------------------------------------------------------------------------------- |
| `::after`      | يعرض فاصل الشيفرون بعد كل جزء باستثناء الأخير؛ ينعكس إلى `chevron-left` في `[dir="rtl"]`. |
| `::before`     | في العنصر الأب المطوى، يرسم سهم رجوع مقنع قبل الرابط الثاني من آخر جزء.                   |

## Conditions

| Type  | Query                       | Description                                      |
| ----- | --------------------------- | ------------------------------------------------ |
| media | `(max-width: 47.9375em)`    | —                                                |
| media | `(--breakpoint-large-down)` | يطوي المسار، ويعرض فقط الجزء السابق وسهم الرجوع. |

## Tokens consumed

| Token                                      | Type       | Value                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--instui-color-text-muted`                | `<color>`  | `light-dark(#576773, #AAB0B5)`                                                                                                                                                                                                                                                                                                                                             |
| `--instui-component-breadcrumb-gap-lg`     | `<length>` | `0.5rem`                                                                                                                                                                                                                                                                                                                                                                   |
| `--instui-component-breadcrumb-gap-md`     | `<length>` | `0.25rem`                                                                                                                                                                                                                                                                                                                                                                  |
| `--instui-component-breadcrumb-gap-sm`     | `<length>` | `0.125rem`                                                                                                                                                                                                                                                                                                                                                                 |
| `--instui-component-link-text-color`       | `<color>`  | `light-dark(#2369A4, #7FB4F1)`                                                                                                                                                                                                                                                                                                                                             |
| `--instui-component-link-text-hover-color` | `<color>`  | `light-dark(#1A5281, #ACCDF7)`                                                                                                                                                                                                                                                                                                                                             |
| `--instui-icon-chevron-left`               | `<image>`  | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m15%2018-6-6%206-6%22%2F%3E%3C%2Fsvg%3E')` |
| `--instui-icon-chevron-right`              | `<image>`  | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m9%2018%206-6-6-6%22%2F%3E%3C%2Fsvg%3E')`  |
| `--instui-spacing-space2xs`                | `<length>` | `0.125rem`                                                                                                                                                                                                                                                                                                                                                                 |
