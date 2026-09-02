[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# Fušla: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

Svelte action: `<span use:icon={"arrow-left"} />` renders the icon's inline SVG into the node.

## Parametera

### node

`Element`

The host element.

### name

`string`

The icon name.

## Gullii / Gávdnat

[`ActionResult`](../interfaces/ActionResult.md)

## Exempel

```svelte
<script>
  import { icon } from "@pantoken/svelte";
  import "@pantoken/css";
</script>

<span use:icon={"arrow-left"} />
```
