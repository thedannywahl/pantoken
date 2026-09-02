[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# 函数: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

Svelte action: `<span use:icon={"arrow-left"} />` renders the icon's inline SVG into the node.

## 参数

### node

`Element`

The host element.

### name

`string`

The icon name.

## 返回值

[`ActionResult`](../interfaces/ActionResult.md)

## 示例

```svelte
<script>
  import { icon } from "@pantoken/svelte";
  import "@pantoken/css";
</script>

<span use:icon={"arrow-left"} />
```
