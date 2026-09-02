[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# 함수: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Svelte action: `<span use:icon={"arrow-left"} />` renders the icon's inline SVG into the node.

## 매개변수

### node

`Element`

The host element.

### name

`string`

The icon name.

## 반환값

[`ActionResult`](../interfaces/ActionResult.md)

## 예제

```svelte
<script>
  import { icon } from "@pantoken/svelte";
  import "@pantoken/css";
</script>

<span use:icon={"arrow-left"} />
```
