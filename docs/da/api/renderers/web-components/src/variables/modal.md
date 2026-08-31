[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / modal

# Variable: modal

> `const` **modal**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-modal&gt;` — en rigtig `&lt;dialog&gt;`, så den får fokus-fangst, Escape-for-at-lukke, og en
`::backdrop` gratis. Attributten `open` driver `showModal()`/`close()`; en indfødt afvisning
(Escape eller et baggrund-klik) afspejles tilbage til attributten og genudløses som en bobbende `close`
begivenhed. Kan styres fra lys DOM via Invoker-kommandoer — en
`<button command="--show|--close|--toggle" commandfor="modal-id">` slår det til og fra efter id. Indhold går
ind i standardslotten.

## Example

```html
<button command="--show" commandfor="confirm">Delete…</button>
<instui-modal id="confirm">
  <h2>Delete this item?</h2>
  <button command="--close" commandfor="confirm">Cancel</button>
</instui-modal>
```
