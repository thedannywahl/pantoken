[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# Functie: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimenteel</span>

Svelte action: `<span use:icon={"arrow-left"} />` renders the icon's inline SVG into the node.

## Parameters

### node

`Element`

The host element.

### name

`string`

The icon name.

## Retourneert

[`ActionResult`](../interfaces/ActionResult.md)

## Voorbeeld

```svelte
<script>
  import { icon } from "@pantoken/svelte";
  import "@pantoken/css";
</script>

<span use:icon={"arrow-left"} />
```
