[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# Funktion: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Svelte-handling: `<span use:icon={"arrow-left"} />` rendrer ikonet's inline SVG ind i knuden.

## Parametre

### node

`Element`

Værtelementet.

### name

`string`

Ikonnavnet.

## Returnerer

[`ActionResult`](../interfaces/ActionResult.md)

## Eksempel

```svelte
<script>
  import { icon } from "@pantoken/svelte";
  import "@pantoken/css";
</script>

<span use:icon={"arrow-left"} />
```
