[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / tray

# Variable: tray

> `const` **tray**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-tray&gt;` — պանել դոկ կազմել դեհ շեր, աջակցված սկզբնական `[popover]`-ի (վերին շերտ +
թեթև փակ): `placement` քարտեզագրում է `-placement-&lt;value&gt;`-ի (օ.գ. `start`, `end`, `top`, `bottom`) և
`size`-ը `-size-&lt;value&gt;`-ի; թեթև DOM-ի `popovertarget` կոճակ այն անջատում id-ով: Բովանդակությունը մտնում է
լռելյալ սլոտում:

## Example

```html
<button popovertarget="nav">Menu</button>
<instui-tray id="nav" placement="start" size="small">…</instui-tray>
```
