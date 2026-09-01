[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / pages

# متغير: pages

> `const` **pages**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

`&lt;instui-pages&gt;` — يعرض لوحَة `[data-page]` واحدة مخصصة في كل مرة، ويتبادلها مع واجهة برمجة التطبيقات View
Transitions عند توفرها (وإلا فمفتاح تبديل بسيط). `push(id)`/`back()` تحافظان على مكدس تاريخ؛ السمة
`active` تعكس الصفحة الحالية ويمكن تعيينها للتنقل، وحدث `change` المتصاعد (`detail.page`) ينطلق عند كل تبديل. يمكن قيادته من DOM الخفيف عبر أوامر Invoker:
`<button command="--push" commandfor="pages-id" data-page="…">` و
`<button command="--back" commandfor="pages-id">`.

## مثال

```html
<instui-pages active="one">
  <section data-page="one">First <button command="--push" commandfor="p" data-page="two">Next</button></section>
  <section data-page="two">Second <button command="--back" commandfor="p">Back</button></section>
</instui-pages>
```
