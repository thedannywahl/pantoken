[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# تابع: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Svelte action: `<span use:icon={"arrow-left"} />` renders the icon's inline SVG into the node.

## پارامترها

### node

`Element`

The host element.

### name

`string`

The icon name.

## مقدار بازگشتی

[`ActionResult`](../interfaces/ActionResult.md)

## نمونه

```svelte
<script>
  import { icon } from "@pantoken/svelte";
  import "@pantoken/css";
</script>

<span use:icon={"arrow-left"} />
```
