[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# Function: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

إجراء Svelte: `<span use:icon={"arrow-left"} />` يعرض SVG الرمز المضمنة في العقدة.

## Parameters

### node

`Element`

عنصر المضيف.

### name

`string`

اسم الرمز.

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
