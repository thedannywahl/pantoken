[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# Funzione: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Sperimentale</span>

Svelte action: `<span use:icon={"arrow-left"} />` renders the icon's inline SVG into the node.

## Parametri

### node

`Element`

The host element.

### name

`string`

The icon name.

## Restituisce

[`ActionResult`](../interfaces/ActionResult.md)

## Esempio

```svelte
<script>
  import { icon } from "@pantoken/svelte";
  import "@pantoken/css";
</script>

<span use:icon={"arrow-left"} />
```
