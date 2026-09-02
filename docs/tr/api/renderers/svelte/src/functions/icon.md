[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# Fonksiyon: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Deneysel</span>

Svelte action: `<span use:icon={"arrow-left"} />` renders the icon's inline SVG into the node.

## Parametreler

### node

`Element`

The host element.

### name

`string`

The icon name.

## Döndürür

[`ActionResult`](../interfaces/ActionResult.md)

## Örnek

```svelte
<script>
  import { icon } from "@pantoken/svelte";
  import "@pantoken/css";
</script>

<span use:icon={"arrow-left"} />
```
