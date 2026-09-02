[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# Fonction: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Expérimental</span>

Svelte action: `<span use:icon={"arrow-left"} />` renders the icon's inline SVG into the node.

## Paramètres

### node

`Element`

The host element.

### name

`string`

The icon name.

## Renvoie

[`ActionResult`](../interfaces/ActionResult.md)

## Exemple

```svelte
<script>
  import { icon } from "@pantoken/svelte";
  import "@pantoken/css";
</script>

<span use:icon={"arrow-left"} />
```
