[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / pages

# Variable: pages

> `const` **pages**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

`&lt;instui-pages&gt;` — mostra un plafó `[data-page]` ranurat alhora, canviant amb la View Transitions API quan està disponible (un simple commutador en cas contrari). `push(id)`/`back()` mantenen una pila d'historial; l'atribut `active` reflecteix la pàgina actual i es pot establir per navegar, i un event `change` en propòsit (`detail.page`) es dispara per a cada canvi. Es pot impulsar des del DOM lleuger mitjançant Comandes d'Invocador:
`<button command="--push" commandfor="pages-id" data-page="…">` i
`<button command="--back" commandfor="pages-id">`.

## Exemple

```html
<instui-pages active="one">
  <section data-page="one">First <button command="--push" commandfor="p" data-page="two">Next</button></section>
  <section data-page="two">Second <button command="--back" commandfor="p">Back</button></section>
</instui-pages>
```
