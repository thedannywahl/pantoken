[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / pages

# Variabel: pages

> `const` **pages**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-pages&gt;` — viser ét slottet `[data-page]` panel ad gangen, og skifter med View Transitions API, når det er tilgængeligt (en simpel toggle ellers). `push(id)`/`back()` gemmer en historikstack; attributten `active` afspejler den nuværende side og kan sættes for at navigere, og en boublende `change` begivenhed (`detail.page`) udløses ved hvert skift. Kan styres fra light DOM via Invoker Commands: `<button command="--push" commandfor="pages-id" data-page="…">` og `<button command="--back" commandfor="pages-id">`.

## Eksempel

```html
<instui-pages active="one">
  <section data-page="one">First <button command="--push" commandfor="p" data-page="two">Next</button></section>
  <section data-page="two">Second <button command="--back" commandfor="p">Back</button></section>
</instui-pages>
```
