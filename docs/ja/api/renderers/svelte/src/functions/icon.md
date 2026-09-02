[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# 関数: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

Svelte action: `<span use:icon={"arrow-left"} />` renders the icon's inline SVG into the node.

## パラメーター

### node

`Element`

The host element.

### name

`string`

The icon name.

## 戻り値

[`ActionResult`](../interfaces/ActionResult.md)

## 例

```svelte
<script>
  import { icon } from "@pantoken/svelte";
  import "@pantoken/css";
</script>

<span use:icon={"arrow-left"} />
```
