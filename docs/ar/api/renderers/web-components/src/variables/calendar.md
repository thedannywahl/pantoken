[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / calendar

# متغير: calendar

> `const` **calendar**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

`&lt;instui-calendar&gt;` — شبكة شهرية تفاعلية. `value` (`yyyy-mm-dd`) هو اليوم المحدد و
`view` (`yyyy-mm-dd`, اختياري) هو الشهر الظاهر. أسهم السابق/التالي وكل يوم هي
`&lt;button&gt;`s التي تُفعّل Invoker Commands API (`--calendar-prev`, `--calendar-next`,
`--calendar-select`) على الشبكة؛ اختيار يوم يُحدِّث `value`/`view` ويرسل حدثًا مركبًا
قابلًا للتمدد (bubbling) `change` (`detail.value` هو التاريخ بصيغة ISO). يعرض شبكته الخاصة (بدون فتحة)، لذا
يعمل بشكل مستقل أو مضمّن داخل منتقي التاريخ.

## مثال

```html
<instui-calendar value="2026-07-08"></instui-calendar>
```
