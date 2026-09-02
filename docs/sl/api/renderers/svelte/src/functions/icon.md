[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# Funkcija: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentalno</span>

Svelte action: `<span use:icon={"arrow-left"} />` renders the icon's inline SVG into the node.

## Parametri

### node

`Element`

The host element.

### name

`string`

The icon name.

## Vrne

[`ActionResult`](../interfaces/ActionResult.md)

## Primer

```svelte
<script>
  import { icon } from "@pantoken/svelte";
  import "@pantoken/css";
</script>

<span use:icon={"arrow-left"} />
```
