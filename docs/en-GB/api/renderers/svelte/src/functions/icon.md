[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# Function: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Svelte action: `<span use:icon={"arrow-left"} />` renders the icon's inline SVG into the node.

## Parameters

### node

`Element`

The host element.

### name

`string`

The icon name.

## Returns

[`ActionResult`](../interfaces/ActionResult.md)

## Example

```svelte
<script>
  import { icon } from "@pantoken/svelte";
  import "@pantoken/css";
</script>

<span use:icon={"arrow-left"} />
```
