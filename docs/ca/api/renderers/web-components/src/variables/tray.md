[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / tray

# Variable: tray

> `const` **tray**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-tray&gt;` — un plafó acoblat a una vora de la finestra de visualització, recolzat per un `[popover]` natiu (capa superior + dismissió clara). `placement` es mapeja a `-placement-&lt;value&gt;` (p. ex. `start`, `end`, `top`, `bottom`) i `size` a `-size-&lt;value&gt;`; un botó `popovertarget` del DOM lleuger el commuta per id. El contingut va a l'slot per defecte.

## Example

```html
<button popovertarget="nav">Menu</button>
<instui-tray id="nav" placement="start" size="small">…</instui-tray>
```
