[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / popover

# 變數: popover

> `const` **popover**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha（內測）</span>

`&lt;instui-popover&gt;` — a floating surface. Like `&lt;instui-context-view&gt;`, the host is a native
`[popover]` (top layer + light-dismiss), so a light-DOM `popovertarget` button can toggle it by id.
Content goes in the default slot.

## 範例

```html
<button popovertarget="menu">Options</button>
<instui-popover id="menu">…</instui-popover>
```
