[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# Funkcja: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperymentalne</span>

Svelte action: `<span use:icon={"arrow-left"} />` renders the icon's inline SVG into the node.

## Parametry

### node

`Element`

The host element.

### name

`string`

The icon name.

## Zwraca

[`ActionResult`](../interfaces/ActionResult.md)

## Przykład

```svelte
<script>
  import { icon } from "@pantoken/svelte";
  import "@pantoken/css";
</script>

<span use:icon={"arrow-left"} />
```
