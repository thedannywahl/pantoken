[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# फंक्शन: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Svelte action: `<span use:icon={"arrow-left"} />` renders the icon's inline SVG into the node.

## पैरामीटर

### node

`Element`

The host element.

### name

`string`

The icon name.

## वापसी

[`ActionResult`](../interfaces/ActionResult.md)

## उदाहरण

```svelte
<script>
  import { icon } from "@pantoken/svelte";
  import "@pantoken/css";
</script>

<span use:icon={"arrow-left"} />
```
