[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / pages

# Variable: pages

> `const` **pages**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-pages&gt;` — يعرض لوحة `[data-page]` واحدة مدرجة في كل مرة، مع التبديل باستخدام واجهة برمجة تطبيقات عرض الانتقالات عند توفرها (تبديل عادي بخلاف ذلك). `push(id)`/`back()` تحافظ على مكدس السجل؛ تعكس السمة `active` الصفحة الحالية ويمكن تعيينها للتنقل، وحدث `change` الفقاعي (`detail.page`) ينطلق في كل تبديل. يمكن التحكم فيها من DOM الخفيف عبر أوامر المستدعي:
`<button command="--push" commandfor="pages-id" data-page="…">` و
`<button command="--back" commandfor="pages-id">`.

## Example

```html
<instui-pages active="one">
  <section data-page="one">
    First <button command="--push" commandfor="p" data-page="two">Next</button>
  </section>
  <section data-page="two">Second <button command="--back" commandfor="p">Back</button></section>
</instui-pages>
```
