[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# Fungsi: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimental</span>

Svelte action: `<span use:icon={"arrow-left"} />` renders the icon's inline SVG into the node.

## Parameter

### node

`Element`

The host element.

### name

`string`

The icon name.

## Mengembalikan

[`ActionResult`](../interfaces/ActionResult.md)

## Contoh

```svelte
<script>
  import { icon } from "@pantoken/svelte";
  import "@pantoken/css";
</script>

<span use:icon={"arrow-left"} />
```
