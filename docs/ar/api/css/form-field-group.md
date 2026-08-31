# CSS: form-field-group

`.instui-form-field-group` — مجموعة `&lt;fieldset&gt;` مع وسيلة إيضاح وتخطيط عمود أو سطر وتباعد قابل للتكوين.

تعيين `gap` الخاص به بين الحقول، قابل للتعديل باستخدام معدلات `-col-spacing-*`/`-row-spacing-*` أدناه — يُفضل استخدام تلك بدلاً من ربط معدل أداة تباعد عام `-gap-*`، الذي يتجاوز القيمة المدمجة تماماً.

**المصدر:** [form-field-group.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/form-field-group/form-field-group.css)

## Accessibility

يرسم `&lt;fieldset&gt;` أصلياً مع `&lt;legend&gt;`، بحيث يسمي نص وسيلة الإيضاح المجموعة بأكملها لتقنيات المساعدة.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/form-field-group.css";
```

## Examples

```html
<fieldset class="instui-form-field-group -layout-columns -col-spacing-medium">
  <legend>Shipping address</legend>
  <label class="instui-form-field">
    <span class="label">First name</span>
    <span class="controls"><input class="instui-text-input" /></span>
  </label>
  <label class="instui-form-field">
    <span class="label">Last name</span>
    <span class="controls"><input class="instui-text-input" /></span>
  </label>
  <label class="instui-form-field">
    <span class="label">City</span>
    <span class="controls"><input class="instui-text-input" /></span>
  </label>
  <label class="instui-form-field">
    <span class="label">State</span>
    <span class="controls">
      <select class="instui-simple-select">
        <option>CA</option>
        <option>NY</option>
        <option>TX</option>
      </select>
    </span>
  </label>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">All fields are used for delivery only.</span>
  </div>
</fieldset>
```

## Structure

```text
.instui-form-field-group.-layout-columns.-col-spacing-medium
  legend
  form-field (component)
  form-field-messages (component)
```

```mermaid
flowchart TD
  n0[".instui-form-field-group.-layout-columns.-col-spacing-medium"]:::cssdoc-root
  n1("legend"):::cssdoc-part
  n2(["form-field"]):::cssdoc-component
  n3(["form-field-messages"]):::cssdoc-component
  n0 --> n1
  n0 --> n2
  n0 --> n3
  click n2 "/api/css/form-field.md"
  click n3 "/api/css/form-field-messages.md"
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## Modifiers

| Modifier               | Description                             |
| ---------------------- | --------------------------------------- |
| `.-col-spacing-large`  | فجوة عمود كبيرة.                        |
| `.-col-spacing-medium` | فجوة عمود متوسطة.                       |
| `.-col-spacing-none`   | بدون فجوة عمود.                         |
| `.-col-spacing-small`  | فجوة عمود صغيرة.                        |
| `.-layout-aligned`     | محاذاة الحقول الفرعية إلى شبكة مشتركة.  |
| `.-layout-columns`     | ترتيب الحقول الفرعية في أعمدة.          |
| `.-layout-inline`      | ترتيب الحقول الفرعية في سطر واحد في صف. |
| `.-required`           | وضع علامة على المجموعة كمطلوبة.         |
| `.-row-spacing-large`  | فجوة صف كبيرة.                          |
| `.-row-spacing-medium` | فجوة صف متوسطة.                         |
| `.-row-spacing-none`   | بدون فجوة صف.                           |
| `.-row-spacing-small`  | فجوة صف صغيرة.                          |
| `.-v-align-bottom`     | محاذاة الحقول من الأسفل.                |
| `.-v-align-middle`     | محاذاة الحقول من الوسط.                 |
| `.-v-align-top`        | محاذاة الحقول من الأعلى.                |

## Pseudo-elements

| Pseudo-element | Description                                                                               |
| -------------- | ----------------------------------------------------------------------------------------- |
| `::after`      | يرسم علامة النجمة الزخرفية للحقل المطلوب بعد نص وسيلة الإيضاح عندما تكون المجموعة مطلوبة. |

## Conditions

| Type     | Query                              | Description |
| -------- | ---------------------------------- | ----------- |
| supports | `(grid-template-columns: subgrid)` | —           |

## Tokens consumed

| Token                                                 | Type                                               | Value                                                                        |
| ----------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| `--instui-component-form-field-layout-asterisk-color` | `<color>`                                          | `light-dark(#CF1F24, #FA917F)`                                               |
| `--instui-component-form-field-layout-font-family`    | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-form-field-layout-font-size`      | `<length>`                                         | `1rem`                                                                       |
| `--instui-component-form-field-layout-font-weight`    | `<integer>`                                        | `400`                                                                        |
| `--instui-component-form-field-layout-gap-inputs`     | `<length>`                                         | `0.75rem`                                                                    |
| `--instui-component-form-field-layout-gap-primitives` | `<length>`                                         | `0.5rem`                                                                     |
| `--instui-component-form-field-layout-line-height`    | `<length>`                                         | `1.125rem`                                                                   |
| `--instui-component-form-field-layout-text-color`     | `<color>`                                          | `light-dark(#273540, #ffffff)`                                               |
| `--instui-spacing-space-lg`                           | `<length>`                                         | `1rem`                                                                       |
| `--instui-spacing-space-md`                           | `<length>`                                         | `0.75rem`                                                                    |
| `--instui-spacing-space-sm`                           | `<length>`                                         | `0.5rem`                                                                     |

## Browser support

- يستخدم وضع `-layout-aligned` شبكة فرعية CSS خلف حارس `@supports`؛ حيث لا تكون الشبكة الفرعية مدعومة، تعود الحقول إلى تخطيطها المكدس.

## Subcomponents

- [form-field](/ar/api/css/form-field.md)
- [form-field-messages](/ar/api/css/form-field-messages.md)

## Related

- [form-field](/ar/api/css/form-field.md) — الحقل الفردي الذي تكرره هذه المجموعة.
- [radio-input-group](/ar/api/css/radio-input-group.md) — تجميع مدخلات الراديو تحت وسيلة إيضاح.
