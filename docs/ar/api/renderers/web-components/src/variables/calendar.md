[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / calendar

# Variable: calendar

> `const` **calendar**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-calendar&gt;` — شبكة شهر تفاعلية. `value` (`yyyy-mm-dd`) هو اليوم المحدد و
`view` (`yyyy-mm-dd`، اختياري) الشهر المرئي. تحتوي الرموز السابقة/التالية وكل يوم على
`&lt;button&gt;`s التي تقود Invoker Commands API (`--calendar-prev`، `--calendar-next`،
`--calendar-select`) في الشبكة؛ يؤدي تحديد يوم إلى تحديث `value`/`view` وينطلق حدث فقاعي مركب `change` (`detail.value` هو تاريخ ISO). يعرض شبكته الخاصة (بدون فتحة)، لذا
يعمل بشكل مستقل أو متداخل داخل منتقي التاريخ.

## Example

```html
<instui-calendar value="2026-07-08"></instui-calendar>
```
