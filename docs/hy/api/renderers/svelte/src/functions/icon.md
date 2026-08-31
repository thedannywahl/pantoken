[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# Function: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Svelte գործողություն. `<span use:icon={"arrow-left"} />`-ն պատկերում է պատկերի ներդրված SVG-ը հանգույցի մեջ:

## Parameters

### node

`Element`

Կազմակերպիչ տարրը:

### name

`string`

Պատկերի անունը:

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
