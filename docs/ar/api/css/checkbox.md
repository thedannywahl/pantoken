# CSS: checkbox

`.instui-checkbox` — خانة اختيار أصلية وتسميتها، أو مُبدّل عبر `-variant-toggle`.

اضبط `el.indeterminate = true` في JavaScript لإظهار الشرطة للحالة المختلطة؛ علامة الصح عند التحديد تتباين تلقائيًا مع التعبئة — بيضاء على تعبئة داكنة، وقريبة من الأسود على تعبئة فاتحة. كما يعيّن `gap` خاصته بين عنصر التحكم وتسميته؛ تجاوز هذه القيمة المضمّنة يتم بربط معدل تباعد `-gap-*`.

**المصدر:** [checkbox.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/checkbox/checkbox.css)

## سهولة الوصول

تدير `<input type="checkbox">` الأصلية `:checked` و`:indeterminate` و`:disabled`؛ اضبط `el.indeterminate = true` في JavaScript للحالة المختلطة، ولاحظ أن `-readonly` خاص بالتصميم فقط لأن خانات الاختيار ليس لها سمة readonly أصلية.

## الاستخدام

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/checkbox.css";
```

## أمثلة

```html
<label class="instui-checkbox --display-block --mb-sm">
  <input type="checkbox" checked>Checkbox
</label>
<label class="instui-checkbox -variant-toggle">
  <input type="checkbox">Toggle
</label>
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.-invalid` | حالة غير صالحة (خطأ). |
| `.-label-placement-end` | ضع التسمية بعد عنصر التحكم. |
| `.-label-placement-start` | ضع التسمية قبل عنصر التحكم. |
| `.-label-placement-top` | ضع التسمية فوق عنصر التحكم. |
| `.-readonly` | حالة للقراءة فقط. |
| `.-required` | أظهر نجمة الحقل الإلزامي بجانب التسمية. |
| `.-size-large` | كبير. الاسم الطويل لـ `-size-lg`. |
| `.-size-lg` | كبير. |
| `.-size-sm` | صغير. |
| `.-size-small` | صغير. الاسم الطويل لـ `-size-sm`. |
| `.-variant-toggle` | اعرض كمبدّل بدلاً من مربع. |

## الأجزاء

| جزء | الوصف |
| --- | --- |
| `.asterisk` | نجمة الحقل الإلزامي. |

## عناصر زائفة

| عنصر زائف | الوصف |
| --- | --- |
| `::after` | على `-variant-toggle`، رمز الحالة على المقبض: X عند الإيقاف، وعلامة صح عند التشغيل. |
| `::before` | علامة الصح المقنعة أو شرطة الحالة المركزية داخل المربع؛ على `-variant-toggle` تتحول إلى المقبض المنزلق بدلاً من ذلك. |

## الحالات

| حالة | الوصف |
| --- | --- |
| `:checked` | — |
| `:disabled` | — |
| `:indeterminate` | — |

## خصائص مخصّصة

| خاصية | نوع | افتراضي | الوصف |
| --- | --- | --- | --- |
| `--pantoken-cb-glyph` | `<url>` | — | رمز القناع للمربع: علامة صح عند التحديد، وشرطة عند الحالة غير المحددة. |
| `--pantoken-toggle-bw` | `<length>` | — | عرض حد المُبدّل. |
| `--pantoken-toggle-h` | `<length>` | — | ارتفاع مُبدّل التبديل. |
| `--pantoken-toggle-handle` | `<length>` | — | قطر المقبض المحتسب. |
| `--pantoken-toggle-inset` | `<length>` | — | المسافة البادئة للمقبض من كل حافة المسار. |
| `--pantoken-toggle-w` | `<length>` | — | عرض مسار المُبدّل. |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-border-width-sm` | `<length>` | `0.0625rem` |
| `--instui-color-background-muted` | `<color>` | `light-dark(#F2F4F5, #273540)` |
| `--instui-color-stroke-base` | `<color>` | `light-dark(#8D959F, #6A7883)` |
| `--instui-color-text-muted` | `<color>` | `light-dark(#576773, #AAB0B5)` |
| `--instui-component-checkbox-asterisk-color` | `<color>` | `light-dark(#CF1F24, #FA917F)` |
| `--instui-component-checkbox-background-checked-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-checkbox-background-color` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-checkbox-background-disabled-color` | `<color>` | `light-dark(#E8EAEC, #334450)` |
| `--instui-component-checkbox-background-hover-color` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-checkbox-background-readonly-color` | `<color>` | `light-dark(#C7CACD, #6A7883)` |
| `--instui-component-checkbox-border-checked-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-checkbox-border-color` | `<color>` | `light-dark(#7E8792, #5F6E7A)` |
| `--instui-component-checkbox-border-disabled-color` | `<color>` | `light-dark(#C7CACD, #4A5B68)` |
| `--instui-component-checkbox-border-hover-color` | `<color>` | `light-dark(#334450, #7E8792)` |
| `--instui-component-checkbox-border-radius` | `<length>` | `0.25rem` |
| `--instui-component-checkbox-border-readonly-color` | `<color>` | `#8D959F` |
| `--instui-component-checkbox-border-width` | `<length>` | `0.0625rem` |
| `--instui-component-checkbox-control-size-lg` | `<length>` | `1.5rem` |
| `--instui-component-checkbox-control-size-md` | `<length>` | `1.5rem` |
| `--instui-component-checkbox-control-size-sm` | `<length>` | `1.5rem` |
| `--instui-component-checkbox-control-vertical-margin` | `<length>` | `0rem` |
| `--instui-component-checkbox-error-border-color` | `<color>` | `light-dark(#CF1F24, #F56050)` |
| `--instui-component-checkbox-error-border-hover-color` | `<color>` | `light-dark(#CF1F24, #FE7D6A)` |
| `--instui-component-checkbox-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-checkbox-font-size-lg` | `<length>` | `1.25rem` |
| `--instui-component-checkbox-font-size-md` | `<length>` | `1rem` |
| `--instui-component-checkbox-font-size-sm` | `<length>` | `0.875rem` |
| `--instui-component-checkbox-font-weight` | `<integer>` | `400` |
| `--instui-component-checkbox-gap` | `<length>` | `0.5rem` |
| `--instui-component-checkbox-label-base-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-checkbox-label-disabled-color` | `<color>` | `light-dark(#8D959F, #576773)` |
| `--instui-component-checkbox-label-hover-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-checkbox-label-readonly-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-checkbox-line-height` | `<percentage>` | `125%` |
| `--instui-component-radio-input-toggle-background-success` | `<color>` | `#03893D` |
| `--instui-component-radio-input-toggle-handle-text` | `<color>` | `#ffffff` |
| `--instui-component-radio-input-toggle-medium-height` | `<length>` | `2.5rem` |
| `--instui-icon-check` | `<image>` | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M20%206%209%2017l-5-5%22%2F%3E%3C%2Fsvg%3E')` |
| `--instui-icon-minus` | `<image>` | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M5%2012h14%22%2F%3E%3C%2Fsvg%3E')` |
| `--instui-icon-x` | `<image>` | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M18%206%206%2018%22%2F%3E%3Cpath%20d%3D%22m6%206%2012%2012%22%2F%3E%3C%2Fsvg%3E')` |
| `--instui-size-choice-control-height-md` | `<length>` | `1.5rem` |

## ذات صلة

- [radio](/ar/api/css/radio.md) — النظير اختيار واحد.

