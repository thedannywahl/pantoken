[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / tray

# Variabel: tray

> `const` **tray**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-tray&gt;` — et panel forbundet til en visningsportedge, understøttet af et oprindeligt `[popover]` (top layer + light-dismiss). `placement` kortlægges til `-placement-&lt;value&gt;` (f.eks. `start`, `end`, `top`, `bottom`) og `size` til `-size-&lt;value&gt;`; en light-DOM `popovertarget` knap skifter den efter id. Indhold går i standardslotten.

## Eksempel

```html
<button popovertarget="nav">Menu</button>
<instui-tray id="nav" placement="start" size="small">…</instui-tray>
```
