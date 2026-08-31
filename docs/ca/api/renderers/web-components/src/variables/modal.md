[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / modal

# Variable: modal

> `const` **modal**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-modal&gt;` — un `&lt;dialog&gt;` real, així que obté trapatge de focus, Escape-to-close, i un `::backdrop` gratuïtament. L'atribut `open` condueix `showModal()`/`close()`; un amagament natiu (Escape o un clic de fons) es reflecteix de nou a l'atribut i es remet com un event bubbling `close`. Controlable des del DOM lleuger mitjançant ordres d'Invocador — un `<button command="--show|--close|--toggle" commandfor="modal-id">` ho commuta per id. El contingut va a la ranura per defecte.

## Example

```html
<button command="--show" commandfor="confirm">Delete…</button>
<instui-modal id="confirm">
  <h2>Delete this item?</h2>
  <button command="--close" commandfor="confirm">Cancel</button>
</instui-modal>
```
