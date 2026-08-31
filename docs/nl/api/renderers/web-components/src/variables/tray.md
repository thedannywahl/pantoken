[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / tray

# Variable: tray

> `const` **tray**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`<instui-tray>` — a panel docked to a viewport edge, backed by a native `[popover]` (top layer +
light-dismiss). `placement` maps to `-placement-<value>` (e.g. `start`, `end`, `top`, `bottom`) and
`size` to `-size-<value>`; a light-DOM `popovertarget` button toggles it by id. Content goes in the
default slot.

## Example

```html
<button popovertarget="nav">Menu</button>
<instui-tray id="nav" placement="start" size="small">…</instui-tray>
```
