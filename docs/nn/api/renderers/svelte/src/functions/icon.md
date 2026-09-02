[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# Funksjon: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentell</span>

Svelte action: `<span use:icon={"arrow-left"} />` renders the icon's inline SVG into the node.

## Parametrar

### node

`Element`

The host element.

### name

`string`

The icon name.

## Returnerer

[`ActionResult`](../interfaces/ActionResult.md)

## Døme

```svelte
<script>
  import { icon } from "@pantoken/svelte";
  import "@pantoken/css";
</script>

<span use:icon={"arrow-left"} />
```
