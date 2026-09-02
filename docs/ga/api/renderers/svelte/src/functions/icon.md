[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# Feidhm: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Turgnamhach</span>

Svelte action: `<span use:icon={"arrow-left"} />` renders the icon's inline SVG into the node.

## Paraiméadair

### node

`Element`

The host element.

### name

`string`

The icon name.

## Tuairisceáin

[`ActionResult`](../interfaces/ActionResult.md)

## Sampla

```svelte
<script>
  import { icon } from "@pantoken/svelte";
  import "@pantoken/css";
</script>

<span use:icon={"arrow-left"} />
```
