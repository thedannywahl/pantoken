[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# Ֆունկցիա: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Svelte գործողություն. `<span use:icon={"arrow-left"} />`-ն պատկերում է պատկերի ներդրված SVG-ը հանգույցի մեջ:

## Պարամետրեր

### node

`Element`

Կազմակերպիչ տարրը:

### name

`string`

Պատկերի անունը:

## Վերադարձվող արժեք

[`ActionResult`](../interfaces/ActionResult.md)

## Օրինակ

```svelte
<script>
  import { icon } from "@pantoken/svelte";
  import "@pantoken/css";
</script>

<span use:icon={"arrow-left"} />
```
