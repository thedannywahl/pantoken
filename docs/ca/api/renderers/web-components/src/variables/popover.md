[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / popover

# Variable: popover

> `const` **popover**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-popover&gt;` — una superfície flotant. Com `&lt;instui-context-view&gt;`, l'host és un `[popover]` natiu (capa superior + dismissió clara), de manera que un botó `popovertarget` del DOM lleuger pot commutarlo per id. El contingut va a l'slot per defecte.

## Example

```html
<button popovertarget="menu">Options</button> <instui-popover id="menu">…</instui-popover>
```
