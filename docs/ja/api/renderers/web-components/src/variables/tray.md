[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / tray

# 変数: tray

> `const` **tray**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">アルファ</span>

`&lt;instui-tray&gt;` — a panel docked to a viewport edge, backed by a native `[popover]` (top layer +
light-dismiss). `placement` maps to `-placement-&lt;value&gt;` (e.g. `start`, `end`, `top`, `bottom`) and
`size` to `-size-&lt;value&gt;`; a light-DOM `popovertarget` button toggles it by id. Content goes in the
default slot.

## 例

```html
<button popovertarget="nav">Menu</button>
<instui-tray id="nav" placement="start" size="small">…</instui-tray>
```
