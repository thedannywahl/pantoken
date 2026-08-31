[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# Function: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Svelte-handling: `<span use:icon={"arrow-left"} />` rendrer ikonet's inline SVG ind i knuden.

## Parameters

### node

`Element`

Værtelementet.

### name

`string`

Ikonnavnet.

## Returns

[`ActionResult`](../interfaces/ActionResult.md)

## Example

```svelte
<script>
  import { icon } from "@pantoken/svelte";
  import "@pantoken/css";
</script>

<span use:icon={"arrow-left"} />
```
