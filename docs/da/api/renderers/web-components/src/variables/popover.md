[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / popover

# Variable: popover

> `const` **popover**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-popover&gt;` — en flydende flade. Som `&lt;instui-context-view&gt;` er værten et oprindeligt `[popover]` (top layer + light-dismiss), så en light-DOM `popovertarget` knap kan skifte den efter id. Indhold går i standardslotten.

## Example

```html
<button popovertarget="menu">Options</button> <instui-popover id="menu">…</instui-popover>
```
