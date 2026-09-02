[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# Mahi: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Whakamātautau</span>

Svelte action: `<span use:icon={"arrow-left"} />` renders the icon's inline SVG into the node.

## Ngā Tawhā

### node

`Element`

The host element.

### name

`string`

The icon name.

## Whakahokia

[`ActionResult`](../interfaces/ActionResult.md)

## Tauira

```svelte
<script>
  import { icon } from "@pantoken/svelte";
  import "@pantoken/css";
</script>

<span use:icon={"arrow-left"} />
```
