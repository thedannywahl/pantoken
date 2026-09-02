[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / pages

# Variabele: pages

> `const` **pages**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-pages&gt;` — shows one slotted `[data-page]` panel at a time, swapping with the View
Transitions API when available (a plain toggle otherwise). `push(id)`/`back()` keep a history
stack; the `active` attribute reflects the current page and can be set to navigate, and a bubbling
`change` event (`detail.page`) fires per swap. Drivable from light DOM via Invoker Commands:
`<button command="--push" commandfor="pages-id" data-page="…">` and
`<button command="--back" commandfor="pages-id">`.

## Voorbeeld

```html
<instui-pages active="one">
  <section data-page="one">First <button command="--push" commandfor="p" data-page="two">Next</button></section>
  <section data-page="two">Second <button command="--back" commandfor="p">Back</button></section>
</instui-pages>
```
