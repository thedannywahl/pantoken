# CSS: radio-input-group

`.instui-radio-input-group` — زر اختيار أحادي الاختيار `&lt;fieldset&gt;`، عادي أو كمفتاح مقسم متصل.

يضبط `gap` الخاص به بين أزرار الراديو؛ ربط معدل مسافة `-gap-*` يتجاوز تلك القيمة المضمّنة.

**المصدر:** [radio-input-group.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/radio-input-group/radio-input-group.css)

## سهولة الوصول

يعرض عنصر `&lt;fieldset&gt;` أصليًا مع `&lt;legend&gt;` يسمّي المجموعة؛ تشترك عناصر الراديو الفرعية في `name` واحدة، لذا لا يمكن اختيار إلا واحد منها في كل مرة.

## الاستخدام

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/radio-input-group.css";
```

## أمثلة

```html
<fieldset class="instui-radio-input-group">
  <legend>T-shirt size</legend>
  <label class="instui-radio"><input type="radio" name="size" checked> Small</label>
  <label class="instui-radio"><input type="radio" name="size"> Medium</label>
  <label class="instui-radio"><input type="radio" name="size"> Large</label>
</fieldset>
```
### Toggle variant
```html
<fieldset class="instui-radio-input-group -variant-toggle">
  <legend>T-shirt size</legend>
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" checked> Small</label>
  <label class="instui-radio -variant-toggle"><input type="radio" name="size"> Medium</label>
  <label class="instui-radio -variant-toggle"><input type="radio" name="size"> Large</label>
</fieldset>
```

## الهيكل

```text
.instui-radio-input-group.-variant-toggle
  legend
  radio (component)
    input
```

```mermaid
flowchart TD
  n0[".instui-radio-input-group.-variant-toggle"]:::cssdoc-root
  n1("legend"):::cssdoc-part
  n2(["radio"]):::cssdoc-component
  n3("input"):::cssdoc-part
  n0 --> n1
  n2 --> n3
  n0 --> n2
  click n2 "/api/css/radio.md"
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.-layout-columns` | رتّب أزرار الراديو عموديًا في أعمدة. |
| `.-layout-inline` | رتّب أزرار الراديو في سطر واحد (متتالية). |
| `.-required` | وَسم المجموعة بأنها مطلوبة. |
| `.-variant-toggle` | رتّب المفاتيح الفرعية كعنصر تحكّم مقسم (يمتلئ فقط المقطع المحدد). |

## عناصر زائفة

| عنصر زائف | الوصف |
| --- | --- |
| `::after` | يعرض علامة النجمة الزخرفية للحقل المطلوب بعد نص العنوان عندما تكون المجموعة مطلوبة. |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-component-form-field-layout-asterisk-color` | `<color>` | `light-dark(#CF1F24, #FA917F)` |
| `--instui-component-form-field-layout-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-form-field-layout-font-size` | `<length>` | `1rem` |
| `--instui-component-form-field-layout-font-weight` | `<integer>` | `400` |
| `--instui-component-form-field-layout-gap-inputs` | `<length>` | `0.75rem` |
| `--instui-component-form-field-layout-gap-primitives` | `<length>` | `0.5rem` |
| `--instui-component-form-field-layout-line-height` | `<length>` | `1.125rem` |
| `--instui-component-form-field-layout-text-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-spacing-space-md` | `<length>` | `0.75rem` |

## مكونات فرعية

- [radio](/ar/api/css/radio.md)

## ذات صلة

- [radio](/ar/api/css/radio.md) — عنصر التحكم الفردي الذي تجمعه هذه المجموعة.
- [form-field-group](/ar/api/css/form-field-group.md) — الغلاف العام لتجميع الحقول وترتيبها.

