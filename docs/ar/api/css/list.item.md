# CSS: list.item

`.instui-list` — عنصر قائمة (InstUI `List.Item`).

المُعدِّلات على العنصر الأصل `list` مثل `-size-sm`/`-size-lg`، `-ordered`، و`-delimiter-solid`/`-delimiter-dashed` تعيد تنسيق هذا العضو — اطلع على وثيقة `list` الخاصة بتلك المُعدِّلات.

## الاستخدام

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/list.item.css";
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.-delimiter-dashed` | فصل العناصر بواسطة خط منقّط. @affects list.item — يضيف قاعدة فاصل بين العناصر. |
| `.-delimiter-solid` | فصل العناصر بواسطة خط متصل. @affects list.item — يضيف قاعدة فاصل بين العناصر. |
| `.-ordered` | ترقيم القوائم المرتبة. @affects list.item — يضيف ثِقل العلامة والمسافة البادئة. |
| `.-size-large` | اسم بديل طويل لـ `-size-lg`. |
| `.-size-medium` | اسم بديل طويل لـ `-size-md`. |
| `.-size-small` | اسم بديل طويل لـ `-size-sm`. |

## عناصر زائفة

| عنصر زائف | الوصف |
| --- | --- |
| `::marker` | يعرض نقطة القائمة أو رقم القائمة المرتبة. |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-component-list-item-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-list-item-delimiter-dashed-border-color` | `<color>` | `light-dark(#E8EAEC, #2D3D49)` |
| `--instui-component-list-item-delimiter-dashed-border-style` | — | `dashed` |
| `--instui-component-list-item-delimiter-dashed-border-width` | `<length>` | `0.0625rem` |
| `--instui-component-list-item-delimiter-solid-border-color` | `<color>` | `light-dark(#E8EAEC, #2D3D49)` |
| `--instui-component-list-item-delimiter-solid-border-style` | — | `solid` |
| `--instui-component-list-item-delimiter-solid-border-width` | `<length>` | `0.0625rem` |
| `--instui-component-list-item-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-list-item-font-size-large` | `<length>` | `1.25rem` |
| `--instui-component-list-item-font-size-medium` | `<length>` | `1rem` |
| `--instui-component-list-item-font-size-small` | `<length>` | `0.875rem` |
| `--instui-component-list-item-font-weight` | `<integer>` | `400` |
| `--instui-component-list-item-line-height` | `<percentage>` | `150%` |
| `--instui-component-list-item-spacing-medium` | `<length>` | `1.5rem` |
| `--instui-component-list-ordered-number-font-weight` | `<integer>` | `600` |
| `--instui-component-list-ordered-number-margin` | `<length>` | `0.5rem` |

