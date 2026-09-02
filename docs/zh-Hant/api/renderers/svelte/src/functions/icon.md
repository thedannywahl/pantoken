[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# 函式: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

Svelte action: `<span use:icon={"arrow-left"} />` renders the icon's inline SVG into the node.

## 參數

### node

`Element`

The host element.

### name

`string`

The icon name.

## 回傳

[`ActionResult`](../interfaces/ActionResult.md)

## 範例

```svelte
<script>
  import { icon } from "@pantoken/svelte";
  import "@pantoken/css";
</script>

<span use:icon={"arrow-left"} />
```
