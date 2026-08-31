# CSS: form-field

`.instui-form-field` — غلاف حقل نموذج: تسمية وعناصر تحكمها وتخطيطات مضمنة أو مطلوبة أو للقراءة فقط.

تبقى رسالة الخطأ مخفية حتى يكون التحكم في الحقل `:user-invalid` (بعد تفاعل المستخدم) أو تضيف فئة `-invalid`. استخدم `-layout-inline` لوضع التسمية بجانب عناصر التحكم و `-layout-stacked` لوضعها فوق. يعين أيضاً `gap` الخاص به بين التسمية والتحكمات والرسائل؛ ربط معدل أداة تباعد `-gap-*` يتجاوز تلك القيمة المدمجة.

**المصدر:** [form-field.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/form-field/form-field.css)

## Accessibility

عنصر `&lt;label&gt;` يلف التحكم، بحيث ينسب نص التسمية إليه بشكل أصلي؛ علامة النجمة المطلوبة زخرفية ويجب إخفاؤها من تقنيات المساعدة (aria-hidden)، ورسالة الخطأ تظهر بمجرد أن يكون التحكم `:user-invalid` أو تضيف فئة `-invalid`.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/form-field.css";
```

## Examples

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"
    ><input class="instui-text-input" type="email" placeholder="you@example.com"
  /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
    <span class="instui-form-field-message -type-error">Enter a valid email address.</span>
  </div>
</label>
```

## Structure

```text
.instui-form-field
  .label
  .controls
    text-input (component)
  form-field-messages (component)
```

```mermaid
flowchart TD
  n0[".instui-form-field"]:::cssdoc-root
  n1(".label"):::cssdoc-part
  n2(".controls"):::cssdoc-part
  n3(["text-input"]):::cssdoc-component
  n4(["form-field-messages"]):::cssdoc-component
  n0 --> n1
  n2 --> n3
  n0 --> n2
  n0 --> n4
  click n3 "/api/css/text-input.md"
  click n4 "/api/css/form-field-messages.md"
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## Modifiers

| Modifier              | Description                               |
| --------------------- | ----------------------------------------- |
| `.-inline`            | تخطيط مضمن (اختصار ل `-layout-inline`).   |
| `.-invalid`           | حالة غير صحيحة (خطأ).                     |
| `.-label-align-end`   | محاذاة نص التسمية من النهاية.             |
| `.-label-align-start` | محاذاة نص التسمية من البداية.             |
| `.-layout-inline`     | تخطيط مضمن: تسمية بجانب عناصر التحكم.     |
| `.-layout-stacked`    | تخطيط مكدس: تسمية فوق عناصر التحكم.       |
| `.-readonly`          | حالة القراءة فقط.                         |
| `.-v-align-bottom`    | محاذاة التسمية مع عناصر التحكم من الأسفل. |
| `.-v-align-top`       | محاذاة التسمية مع عناصر التحكم من الأعلى. |

## Parts

| Part        | Description                         |
| ----------- | ----------------------------------- |
| `.controls` | منطقة التحكم بجانب أو أسفل التسمية. |
| `.label`    | تسمية الحقل.                        |

## Pseudo-elements

| Pseudo-element | Description                                                                       |
| -------------- | --------------------------------------------------------------------------------- |
| `::after`      | يرسم علامة النجمة الزخرفية للحقل المطلوب بعد نص التسمية عندما يكون الحقل مطلوباً. |

## States

| State       | Description |
| ----------- | ----------- |
| `:required` | —           |

## Tokens consumed

| Token                                                      | Type                                               | Value                                                                        |
| ---------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| `--instui-component-form-field-layout-asterisk-color`      | `<color>`                                          | `light-dark(#CF1F24, #FA917F)`                                               |
| `--instui-component-form-field-layout-font-family`         | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-form-field-layout-font-size`           | `<length>`                                         | `1rem`                                                                       |
| `--instui-component-form-field-layout-font-weight`         | `<integer>`                                        | `400`                                                                        |
| `--instui-component-form-field-layout-gap-inputs`          | `<length>`                                         | `0.75rem`                                                                    |
| `--instui-component-form-field-layout-gap-primitives`      | `<length>`                                         | `0.5rem`                                                                     |
| `--instui-component-form-field-layout-line-height`         | `<length>`                                         | `1.125rem`                                                                   |
| `--instui-component-form-field-layout-readonly-text-color` | `<color>`                                          | `light-dark(#576773, #AAB0B5)`                                               |
| `--instui-component-form-field-layout-text-color`          | `<color>`                                          | `light-dark(#273540, #ffffff)`                                               |

## Browser support

- يحتوي على أنماط عنصره مع قاعدة CSS `@scope`؛ يتطلب إصدارًا حديثًا من Chromium أو Firefox أو Safari.

## Subcomponents

- [form-field-messages](/ar/api/css/form-field-messages.md)
- [text-input](/ar/api/css/text-input.md)

## Related

- [form-field-messages](/ar/api/css/form-field-messages.md) — يرسم رسائل التلميح والخطأ والنجاح للحقل.
- [form-field-group](/ar/api/css/form-field-group.md) — تجميع الحقول ذات الصلة تحت وسيلة إيضاح مشتركة.
