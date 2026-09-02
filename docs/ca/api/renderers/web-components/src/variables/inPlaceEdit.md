[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / inPlaceEdit

# Variable: inPlaceEdit

> `const` **inPlaceEdit**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

`&lt;instui-in-place-edit&gt;` — un camp editable amb clic. `value` es mostra com a text; en fer clic/focus es torna editable, Intro o desenfocar confirma (i dispara un event bubbling `change` amb `detail.value`), i Escape es reverteix al valor anterior a l'edició. `readonly` deshabilita l'edició. Un canvi `value` extern es reflecteix al camp mentre no se n'estigui editant.

## Exemple

```html
<instui-in-place-edit value="Course title"></instui-in-place-edit>
```
