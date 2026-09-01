[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / dateTimeInput

# متغير: dateTimeInput

> `const` **dateTimeInput**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

`&lt;instui-date-time-input&gt;` — `&lt;instui-date-input&gt;` متداخل بالإضافة إلى حقل وقت أصلي. يؤدي التغيير في
أي منهما إلى إعادة حساب `value` المركب (`yyyy-mm-ddThh:mm`، أو التاريخ فقط عندما لا يوجد وقت) وإصدار
`change` مركب وصاعد (`detail.value`). يؤدي تعيين `value` إلى تقسيمه مرة أخرى عبر الحقلين.

## مثال

```html
<instui-date-time-input value="2026-07-08T14:30"></instui-date-time-input>
```
