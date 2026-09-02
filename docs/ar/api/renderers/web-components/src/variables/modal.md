[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / modal

# متغير: modal

> `const` **modal**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

`&lt;instui-modal&gt;` — عنصر `&lt;dialog&gt;` حقيقي، لذا يحصل على حجز التركيز، والإغلاق بواسطة مفتاح Escape، و
`::backdrop` مجانا. السمة `open` تتحكم في `showModal()`/`close()`; الإغلاق الأصلي
(مفتاح Escape أو النقر على الخلفية) ينعكس على السمة ويُعيد إطلاق حدث `close` قابل للانتشار.
قابل للتحكم من DOM الخفيف عبر أوامر Invoker — يقوم
`<button command="--show|--close|--toggle" commandfor="modal-id">` بتبديله بحسب المعرف. يوضع المحتوى
في الفتحة الافتراضية.

## مثال

```html
<button command="--show" commandfor="confirm">Delete…</button>
<instui-modal id="confirm">
  <h2>Delete this item?</h2>
  <button command="--close" commandfor="confirm">Cancel</button>
</instui-modal>
```
