[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# Function: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Acció de Svelte: `<span use:icon={"arrow-left"} />` representa el SVG en línia de l'icona al node.

## Parameters

### node

`Element`

L'element amfitrió.

### name

`string`

El nom de l'icona.

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
