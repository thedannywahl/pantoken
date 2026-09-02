[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / modal

# Breytur: modal

> `const` **modal**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-modal&gt;` — a real `&lt;dialog&gt;`, so it gets focus trapping, Escape-to-close, and a
`::backdrop` for free. The `open` attribute drives `showModal()`/`close()`; a native dismissal
(Escape or a backdrop click) reflects back to the attribute and re-fires as a bubbling `close`
event. Drivable from light DOM via Invoker Commands — a
`<button command="--show|--close|--toggle" commandfor="modal-id">` toggles it by id. Content goes
in the default slot.

## Dæmi

```html
<button command="--show" commandfor="confirm">Delete…</button>
<instui-modal id="confirm">
  <h2>Delete this item?</h2>
  <button command="--close" commandfor="confirm">Cancel</button>
</instui-modal>
```
