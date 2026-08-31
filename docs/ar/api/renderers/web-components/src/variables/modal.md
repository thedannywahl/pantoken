[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / modal

# Variable: modal

> `const` **modal**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-modal&gt;` — `&lt;dialog&gt;` حقيقي، لذا يحصل على محاصرة التركيز، Escape-to-close، و
`::backdrop` مجاني. سمة `open` تشغل `showModal()`/`close()`؛ إلغاء أصلي
(Escape أو نقرة خلفية) ينعكس مرة أخرى إلى السمة وينطلق مرة أخرى كحدث `close` فقاعة
. قابلة للتشغيل من light DOM عبر أوامر Invoker — يبدّل
`<button command="--show|--close|--toggle" commandfor="modal-id">` حسب المعرّف. يذهب المحتوى
إلى الفتحة الافتراضية.

## Example

```html
<button command="--show" commandfor="confirm">Delete…</button>
<instui-modal id="confirm">
  <h2>Delete this item?</h2>
  <button command="--close" commandfor="confirm">Cancel</button>
</instui-modal>
```
