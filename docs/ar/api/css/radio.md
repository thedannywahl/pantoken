# CSS: radio

`.instui-radio` — زر اختيار أصلي وتسميته.

يحدد `gap` الخاص به بين عنصر التحكم وتسميته؛ وربط معدل أداة تباعد `-gap-*` يلغي تلك القيمة المدمجة.

**المصدر:** [radio.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/radio/radio.css)

## Accessibility

محرك `<input type="radio">` الأصلي `:checked` و `:disabled`؛ `-readonly` لأغراض التصميم فقط، حيث لا تحتوي أزرار الاختيار على سمة readonly أصلية.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/radio.css";
```

## Examples

```html
<label class="instui-radio"><input type="radio" name="r" checked /> Option A</label>
```

## Modifiers

| Modifier            | Description                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| `.-context-danger`  | لون سياق الخطر (متغير التبديل).                                                                   |
| `.-context-off`     | لون السياق المحايد/معطل (متغير التبديل).                                                          |
| `.-context-success` | لون سياق النجاح (متغير التبديل).                                                                  |
| `.-context-warning` | لون سياق التحذير (متغير التبديل).                                                                 |
| `.-readonly`        | حالة القراءة فقط.                                                                                 |
| `.-size-large`      | كبير. اسم مستعار طويل الشكل لـ `-size-lg`.                                                        |
| `.-size-lg`         | كبير.                                                                                             |
| `.-size-sm`         | صغير.                                                                                             |
| `.-size-small`      | صغير. اسم مستعار طويل الشكل لـ `-size-sm`.                                                        |
| `.-toggle`          | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-variant-toggle`. |
| `.-variant-toggle`  | العرض كزر تبديل مقسم.                                                                             |

## Pseudo-elements

| Pseudo-element | Description                                                                                                            |
| -------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `::before`     | النقطة الداخلية المملوءة المعروضة عند الاختيار؛ على `-variant-toggle` إنها حلقة التركيز المرسومة خارج الكبسولة مباشرة. |

## States

| State       | Description |
| ----------- | ----------- |
| `:checked`  | —           |
| `:disabled` | —           |

## Custom properties

| Property             | Type      | Default | Description                                                |
| -------------------- | --------- | ------- | ---------------------------------------------------------- |
| `--pantoken-rt-fill` | `<color>` | —       | لون الملء المحدد للتبديل؛ مُعدلات السياق -context-* تحدده. |

## Tokens consumed

| Token                                                      | Type                                               | Value                                                                        |
| ---------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| `--instui-component-radio-input-background-color`          | `<color>`                                          | `light-dark(#ffffff, #171B21)`                                               |
| `--instui-component-radio-input-background-disabled-color` | `<color>`                                          | `light-dark(#E8EAEC, #334450)`                                               |
| `--instui-component-radio-input-background-hover-color`    | `<color>`                                          | `light-dark(#ffffff, #171B21)`                                               |
| `--instui-component-radio-input-background-readonly-color` | `<color>`                                          | `light-dark(#C7CACD, #6A7883)`                                               |
| `--instui-component-radio-input-border-color`              | `<color>`                                          | `light-dark(#7E8792, #5F6E7A)`                                               |
| `--instui-component-radio-input-border-disabled-color`     | `<color>`                                          | `light-dark(#C7CACD, #4A5B68)`                                               |
| `--instui-component-radio-input-border-hover-color`        | `<color>`                                          | `light-dark(#273540, #ffffff)`                                               |
| `--instui-component-radio-input-border-readonly-color`     | `<color>`                                          | `#8D959F`                                                                    |
| `--instui-component-radio-input-border-selected-color`     | `<color>`                                          | `light-dark(#1C222B, #ffffff)`                                               |
| `--instui-component-radio-input-border-width`              | `<length>`                                         | `0.0625rem`                                                                  |
| `--instui-component-radio-input-checked-inset-lg`          | `<length>`                                         | `0.375rem`                                                                   |
| `--instui-component-radio-input-checked-inset-md`          | `<length>`                                         | `0.375rem`                                                                   |
| `--instui-component-radio-input-checked-inset-sm`          | `<length>`                                         | `0.375rem`                                                                   |
| `--instui-component-radio-input-control-size-lg`           | `<length>`                                         | `1.5rem`                                                                     |
| `--instui-component-radio-input-control-size-md`           | `<length>`                                         | `1.5rem`                                                                     |
| `--instui-component-radio-input-control-size-sm`           | `<length>`                                         | `1.5rem`                                                                     |
| `--instui-component-radio-input-control-vertical-margin`   | `<length>`                                         | `0rem`                                                                       |
| `--instui-component-radio-input-font-family`               | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-radio-input-font-size-lg`              | `<length>`                                         | `1.25rem`                                                                    |
| `--instui-component-radio-input-font-size-md`              | `<length>`                                         | `1rem`                                                                       |
| `--instui-component-radio-input-font-size-sm`              | `<length>`                                         | `0.875rem`                                                                   |
| `--instui-component-radio-input-font-weight`               | `<integer>`                                        | `400`                                                                        |
| `--instui-component-radio-input-gap`                       | `<length>`                                         | `0.5rem`                                                                     |
| `--instui-component-radio-input-label-base-color`          | `<color>`                                          | `light-dark(#273540, #ffffff)`                                               |
| `--instui-component-radio-input-label-disabled-color`      | `<color>`                                          | `light-dark(#8D959F, #576773)`                                               |
| `--instui-component-radio-input-label-hover-color`         | `<color>`                                          | `light-dark(#273540, #ffffff)`                                               |
| `--instui-component-radio-input-label-readonly-color`      | `<color>`                                          | `light-dark(#273540, #F2F4F5)`                                               |
| `--instui-component-radio-input-line-height-lg`            | `<length>`                                         | `1.5rem`                                                                     |
| `--instui-component-radio-input-line-height-md`            | `<length>`                                         | `1.5rem`                                                                     |
| `--instui-component-radio-input-line-height-sm`            | `<length>`                                         | `1.25rem`                                                                    |
| `--instui-component-radio-input-toggle-background-danger`  | `<color>`                                          | `#CF4A00`                                                                    |
| `--instui-component-radio-input-toggle-background-off`     | `<color>`                                          | `#03893D`                                                                    |
| `--instui-component-radio-input-toggle-background-success` | `<color>`                                          | `#03893D`                                                                    |
| `--instui-component-radio-input-toggle-background-warning` | `<color>`                                          | `#CF4A00`                                                                    |
| `--instui-component-radio-input-toggle-border-radius`      | `<length>`                                         | `0.25rem`                                                                    |
| `--instui-component-radio-input-toggle-handle-text`        | `<color>`                                          | `#ffffff`                                                                    |
| `--instui-component-radio-input-toggle-large-font-size`    | `<length>`                                         | `1rem`                                                                       |
| `--instui-component-radio-input-toggle-large-height`       | `<length>`                                         | `3rem`                                                                       |
| `--instui-component-radio-input-toggle-medium-font-size`   | `<length>`                                         | `0.875rem`                                                                   |
| `--instui-component-radio-input-toggle-medium-height`      | `<length>`                                         | `2.5rem`                                                                     |
| `--instui-component-radio-input-toggle-small-font-size`    | `<length>`                                         | `0.75rem`                                                                    |
| `--instui-component-radio-input-toggle-small-height`       | `<length>`                                         | `2rem`                                                                       |
| `--instui-elevation-depth1`                                | `none \| <shadow>#`                                | —                                                                            |
| `--instui-focus-outline-color`                             | `auto \| <color>`                                  | —                                                                            |
| `--instui-focus-outline-style`                             | `auto \| <outline-line-style>`                     | —                                                                            |
| `--instui-focus-outline-width`                             | `<line-width>`                                     | —                                                                            |

## Related

- [checkbox](/ar/api/css/checkbox.md) — نظيراً متعدد الاختيار لأداة اختيار واحدة.
- [radio-input-group](/ar/api/css/radio-input-group.md) — يجمع أزرار الاختيار في مجموعة حقول اختيار واحدة.
