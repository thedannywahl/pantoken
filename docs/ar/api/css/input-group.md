# CSS: input-group

`.instui-input-group` — واجهة حول حقل نصي مع فتحات أيقونة في البداية والنهاية.

يغلف نفس إطار الحقل مثل `text-input` مع فتحات أيقونة على كلا الجانبين؛ `-should-not-wrap` مطلوب فقط عندما يؤدي محتوى المجموعة إلى الانقسام إلى سطر ثانٍ.

**Source:** [input-group.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/input-group/input-group.css)

## الاستخدام

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/input-group.css";
```

## أمثلة

```html
<span class="instui-input-group">
  <span class="before">@</span>
  <input type="text" placeholder="username">
</span>
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.-disabled` | حالة معطلة. |
| `.-invalid` | حالة غير صالحة (خطأ). |
| `.-readonly` | حالة للقراءة فقط. |
| `.-should-not-wrap` | إبقاء المجموعة في سطر واحد (بدون التفاف). |
| `.-size-large` | كبير. تسمية مطوّلة لـ `-size-lg`. |
| `.-size-lg` | كبير. |
| `.-size-md` | متوسط. |
| `.-size-medium` | متوسط. تسمية طويلة لـ `-size-md`. |
| `.-size-sm` | صغير. |
| `.-size-small` | صغير. تسمية مطوّلة لـ `-size-sm`. |
| `.-success` | حالة نجاح (صالحة). |

## الأجزاء

| جزء | الوصف |
| --- | --- |
| `.after` | فتحة المحتوى اللاحقة. |
| `.before` | فتحة المحتوى السابقة. |

## عناصر زائفة

| عنصر زائف | الوصف |
| --- | --- |
| `::placeholder` | نص العنصر النائب للحقل الداخلي، بلون باهت. |

## الحالات

| حالة | الوصف |
| --- | --- |
| `:disabled` | — |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-component-text-input-background-color` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-text-input-background-disabled-color` | `<color>` | `light-dark(#E8EAEC, #334450)` |
| `--instui-component-text-input-background-hover-color` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-text-input-background-readonly-color` | `<color>` | `light-dark(#C7CACD, #6A7883)` |
| `--instui-component-text-input-border-color` | `<color>` | `light-dark(#7E8792, #5F6E7A)` |
| `--instui-component-text-input-border-disabled-color` | `<color>` | `light-dark(#C7CACD, #4A5B68)` |
| `--instui-component-text-input-border-hover-color` | `<color>` | `light-dark(#334450, #7E8792)` |
| `--instui-component-text-input-border-radius` | `<length>` | `0.75rem` |
| `--instui-component-text-input-border-readonly-color` | `<color>` | `#8D959F` |
| `--instui-component-text-input-border-width` | `<length>` | `0.0625rem` |
| `--instui-component-text-input-error-border-color` | `<color>` | `light-dark(#CF1F24, #F56050)` |
| `--instui-component-text-input-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-text-input-font-size-lg` | `<length>` | `1.25rem` |
| `--instui-component-text-input-font-size-md` | `<length>` | `1rem` |
| `--instui-component-text-input-font-size-sm` | `<length>` | `0.875rem` |
| `--instui-component-text-input-gap-content` | `<length>` | `0.75rem` |
| `--instui-component-text-input-height-lg` | `<length>` | `3rem` |
| `--instui-component-text-input-height-md` | `<length>` | `2.5rem` |
| `--instui-component-text-input-height-sm` | `<length>` | `2rem` |
| `--instui-component-text-input-padding-horizontal-lg` | `<length>` | `0.75rem` |
| `--instui-component-text-input-padding-horizontal-md` | `<length>` | `0.75rem` |
| `--instui-component-text-input-padding-horizontal-sm` | `<length>` | `0.5rem` |
| `--instui-component-text-input-placeholder-color` | `<color>` | `light-dark(#5F6E7A, #7E8792)` |
| `--instui-component-text-input-success-border-color` | `<color>` | `light-dark(#037D37, #3EA75B)` |
| `--instui-component-text-input-text-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-text-input-text-disabled-color` | `<color>` | `light-dark(#8D959F, #9EA6AD)` |
| `--instui-component-text-input-text-readonly-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-focus-outline-color` | `auto \| <color>` | — |
| `--instui-focus-outline-color-danger` | `auto \| <color>` | — |
| `--instui-focus-outline-color-success` | `auto \| <color>` | — |
| `--instui-focus-outline-offset` | `<length>` | — |
| `--instui-focus-outline-radius` | `<length-percentage [0,∞]>{1,4} [ / <length-percentage [0,∞]>{1,4} ]?` | — |
| `--instui-focus-outline-style` | `auto \| <outline-line-style>` | — |
| `--instui-focus-outline-width` | `<line-width>` | — |

## ذات صلة

- [text-input](/ar/api/css/text-input.md) — يغلف حقلًا نصيًا، مضيفًا فتحات أيقونة في البداية والنهاية.

