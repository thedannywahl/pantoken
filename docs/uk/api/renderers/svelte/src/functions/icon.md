[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# Функція: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Експериментальний</span>

Svelte action: `<span use:icon={"arrow-left"} />` renders the icon's inline SVG into the node.

## Параметри

### node

`Element`

The host element.

### name

`string`

The icon name.

## Повертає

[`ActionResult`](../interfaces/ActionResult.md)

## Приклад

```svelte
<script>
  import { icon } from "@pantoken/svelte";
  import "@pantoken/css";
</script>

<span use:icon={"arrow-left"} />
```
