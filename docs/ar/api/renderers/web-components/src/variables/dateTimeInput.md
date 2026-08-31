[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / dateTimeInput

# Variable: dateTimeInput

> `const` **dateTimeInput**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-date-time-input&gt;` — `&lt;instui-date-input&gt;` متداخل بالإضافة إلى حقل وقت أصلي. التغيير لأي منهما
يعيد حساب `value` مدمج (`yyyy-mm-ddThh:mm`، أو فقط التاريخ بدون وقت) ويصدر
حدث `change` مركب فقاعة (`detail.value`). تعيين `value` يقسمه مرة أخرى عبر
الحقلين.

## Example

```html
<instui-date-time-input value="2026-07-08T14:30"></instui-date-time-input>
```
