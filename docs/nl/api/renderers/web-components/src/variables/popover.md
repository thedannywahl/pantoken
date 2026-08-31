[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / popover

# Variable: popover

> `const` **popover**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`<instui-popover>` — a floating surface. Like `<instui-context-view>`, the host is a native
`[popover]` (top layer + light-dismiss), so a light-DOM `popovertarget` button can toggle it by id.
Content goes in the default slot.

## Example

```html
<button popovertarget="menu">Options</button> <instui-popover id="menu">…</instui-popover>
```
