# CSS: modal.body

`.body` — منطقة المحتوى (InstUI `Modal.Body`); عندما يكون `&lt;img&gt;` بمفرده، يمتد بعرض كامل.

معدِّلات `-overflow-fit` و `-density-compact` و `-color-inverse` في العنصر الأب `modal` تعيد تنسيق هذا العضو — راجع وثيقة `modal` نفسها للاطِّلاع على تلك المعدِّلات.

## الاستخدام

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/modal.body.css";
```

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-component-modal-body-inverse-background-color` | `<color>` | `light-dark(#273540, #1C222B)` |
| `--instui-component-modal-body-padding` | `<length>` | `1.5rem` |
| `--instui-component-modal-body-padding-compact` | `<length>` | `0.75rem` |

