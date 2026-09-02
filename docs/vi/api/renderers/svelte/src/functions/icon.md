[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# Hàm: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Thử nghiệm</span>

Svelte action: `<span use:icon={"arrow-left"} />` renders the icon's inline SVG into the node.

## Tham số

### node

`Element`

The host element.

### name

`string`

The icon name.

## Trả về

[`ActionResult`](../interfaces/ActionResult.md)

## Ví dụ

```svelte
<script>
  import { icon } from "@pantoken/svelte";
  import "@pantoken/css";
</script>

<span use:icon={"arrow-left"} />
```
