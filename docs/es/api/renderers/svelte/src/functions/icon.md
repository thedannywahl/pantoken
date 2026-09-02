[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# Función: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Svelte action: `<span use:icon={"arrow-left"} />` renders the icon's inline SVG into the node.

## Parámetros

### node

`Element`

The host element.

### name

`string`

The icon name.

## Devuelve

[`ActionResult`](../interfaces/ActionResult.md)

## Ejemplo

```svelte
<script>
  import { icon } from "@pantoken/svelte";
  import "@pantoken/css";
</script>

<span use:icon={"arrow-left"} />
```
