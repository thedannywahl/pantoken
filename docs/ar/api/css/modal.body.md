# CSS: modal.body

`.body` — منطقة المحتوى (InstUI `Modal.Body`); `&lt;img&gt;` وحيد يذهب بملء النزيف.

معدّلات `-overflow-fit`، `-density-compact`، و`-color-inverse` للعنصر الأب `modal` تعيد تنسيق هذا العضو — انظر وثائق `modal` الخاصة به لتلك المعدّلات.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/modal.body.css";
```

## Tokens consumed

| Token                                                    | Type       | Value                          |
| -------------------------------------------------------- | ---------- | ------------------------------ |
| `--instui-component-modal-body-inverse-background-color` | `<color>`  | `light-dark(#273540, #1C222B)` |
| `--instui-component-modal-body-padding`                  | `<length>` | `1.5rem`                       |
| `--instui-component-modal-body-padding-compact`          | `<length>` | `0.75rem`                      |
