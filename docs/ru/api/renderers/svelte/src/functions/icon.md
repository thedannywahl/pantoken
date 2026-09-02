[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# Функция: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Экспериментально</span>

Svelte action: `<span use:icon={"arrow-left"} />` renders the icon's inline SVG into the node.

## Параметры

### node

`Element`

The host element.

### name

`string`

The icon name.

## Возвращаемое значение

[`ActionResult`](../interfaces/ActionResult.md)

## Пример

```svelte
<script>
  import { icon } from "@pantoken/svelte";
  import "@pantoken/css";
</script>

<span use:icon={"arrow-left"} />
```
