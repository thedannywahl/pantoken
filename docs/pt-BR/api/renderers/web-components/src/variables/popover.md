[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / popover

# Variável: popover

> `const` **popover**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

`&lt;instui-popover&gt;` — a floating surface. Like `&lt;instui-context-view&gt;`, the host is a native
`[popover]` (top layer + light-dismiss), so a light-DOM `popovertarget` button can toggle it by id.
Content goes in the default slot.

## Exemplo

```html
<button popovertarget="menu">Options</button>
<instui-popover id="menu">…</instui-popover>
```
