# CSS: form-field

`.instui-form-field` — A form-field wrapper: a label, its controls, and inline, required, or readonly layouts.

An error message stays hidden until the field's control is `:user-invalid` (after the user interacts) or you add the `-invalid` class. Use `-layout-inline` to put the label beside the controls and `-layout-stacked` to put it above. Also sets its own `gap` between the label, controls, and messages; chaining a `-gap-*` spacing utility modifier overrides that built-in value.

**Source:** [form-field.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/form-field/form-field.css)

## एक्सेसिबिलिटी

The `&lt;label&gt;` element wraps the control, so the label text names it natively; the required asterisk is decorative and should be hidden from assistive tech (aria-hidden), and the error message surfaces once the control is `:user-invalid` or you add the `-invalid` class.

## उपयोग

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/form-field.css";
```

## उदाहरण

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" placeholder="you@example.com"></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
    <span class="instui-form-field-message -type-error">Enter a valid email address.</span>
  </div>
</label>
```

## संरचना

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

## मॉडिफायर

| मॉडिफायर | विवरण |
| --- | --- |
| `.-inline` | Inline layout (shorthand for `-layout-inline`). |
| `.-invalid` | Invalid (error) state. |
| `.-label-align-end` | End-align the label text. |
| `.-label-align-start` | Start-align the label text. |
| `.-layout-inline` | Inline layout: label beside the controls. |
| `.-layout-stacked` | Stacked layout: label above the controls. |
| `.-readonly` | Read-only state. |
| `.-v-align-bottom` | Bottom-align the label with the controls. |
| `.-v-align-top` | Top-align the label with the controls. |

## पार्ट्स

| भाग | विवरण |
| --- | --- |
| `.controls` | The control area beside or below the label. |
| `.label` | The field label. |

## स्यूडो-एलिमेंट्स

| स्यूडो-एलिमेंट | विवरण |
| --- | --- |
| `::after` | Renders the decorative required-field asterisk after the label text when the field is required. |

## स्टेट्स

| स्थिति | विवरण |
| --- | --- |
| `:required` | — |

## उपयोग किये गए टोकन

| टोकन | प्रकार | मान |
| --- | --- | --- |
| `--instui-component-form-field-layout-asterisk-color` | `<color>` | `light-dark(#CF1F24, #FA917F)` |
| `--instui-component-form-field-layout-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-form-field-layout-font-size` | `<length>` | `1rem` |
| `--instui-component-form-field-layout-font-weight` | `<integer>` | `400` |
| `--instui-component-form-field-layout-gap-inputs` | `<length>` | `0.75rem` |
| `--instui-component-form-field-layout-gap-primitives` | `<length>` | `0.5rem` |
| `--instui-component-form-field-layout-line-height` | `<length>` | `1.125rem` |
| `--instui-component-form-field-layout-readonly-text-color` | `<color>` | `light-dark(#576773, #AAB0B5)` |
| `--instui-component-form-field-layout-text-color` | `<color>` | `light-dark(#273540, #ffffff)` |

## ब्राउज़र समर्थन

- Contains its element styles with the CSS `@scope` at-rule; needs a recent Chromium, Firefox, or Safari.

## सबकम्पोनेन्ट्स

- [form-field-messages](/hi/api/css/form-field-messages.md)
- [text-input](/hi/api/css/text-input.md)

## संबंधित

- [form-field-messages](/hi/api/css/form-field-messages.md) — Renders the field's hint, error, and success messages.
- [form-field-group](/hi/api/css/form-field-group.md) — Groups related fields under a shared legend.

