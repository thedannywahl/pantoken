[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / drilldown

# متغير: drilldown

> `const` **drilldown**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

`&lt;instui-drilldown&gt;` — قائمة متعددة المستويات وحافظة للحالة تعتمد على أنماط القوائم. كل مستوى هو `[data-page="id"]` في الـ light-DOM
حيث تُستنسخ `.item`s الداخلية إلى `.instui-menu` في الظِل؛ العنصر الذي يحمل
`data-goto="id"` ينتقل إلى تلك الصفحة وتُعرض صفّ العودة المولّد (أو أي عنصر `[data-back]`)
عند العودة. الـ light DOM هو مصدر البيانات فقط — بدون `&lt;slot&gt;` لا يتم عرضه، لذا تقوم CSS الخاصة بالـ shadow
بتنسيق كل لوحة بالكامل. السمة `active` تعكس الصفحة الحالية ويمكن تعيينها
للتنقل؛ وحدث `navigate` المتدفّق (`detail.page`) يُطلق عند كل حركة. يمكن قيادته من light DOM
عبر أوامر Invoker: `<button command="--goto" commandfor="dd-id" data-page="…">` ينزل و
`<button command="--back" commandfor="dd-id">` يعود.

## مثال

```html
<instui-drilldown active="root">
  <div data-page="root">
    <div class="item" data-goto="settings">Settings</div>
  </div>
  <div data-page="settings">
    <div class="item">Profile</div>
  </div>
</instui-drilldown>
```
