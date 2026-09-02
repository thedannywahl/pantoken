[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / popover

# Newidyn: popover

> `const` **popover**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alffa</span>

`&lt;instui-popover&gt;` — a floating surface. Like `&lt;instui-context-view&gt;`, the host is a native
`[popover]` (top layer + light-dismiss), so a light-DOM `popovertarget` button can toggle it by id.
Content goes in the default slot.

## Enghraifft

```html
<button popovertarget="menu">Options</button>
<instui-popover id="menu">…</instui-popover>
```
