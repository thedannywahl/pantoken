[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# Fall: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Tilrauna</span>

Svelte action: `<span use:icon={"arrow-left"} />` renders the icon's inline SVG into the node.

## Færibreytur

### node

`Element`

The host element.

### name

`string`

The icon name.

## Skilar

[`ActionResult`](../interfaces/ActionResult.md)

## Dæmi

```svelte
<script>
  import { icon } from "@pantoken/svelte";
  import "@pantoken/css";
</script>

<span use:icon={"arrow-left"} />
```
