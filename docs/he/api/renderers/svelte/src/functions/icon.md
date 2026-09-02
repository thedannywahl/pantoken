[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# פונקציה: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">ניסיוני</span>

Svelte action: `<span use:icon={"arrow-left"} />` renders the icon's inline SVG into the node.

## פרמטרים

### node

`Element`

The host element.

### name

`string`

The icon name.

## מחזיר

[`ActionResult`](../interfaces/ActionResult.md)

## דוגמה

```svelte
<script>
  import { icon } from "@pantoken/svelte";
  import "@pantoken/css";
</script>

<span use:icon={"arrow-left"} />
```
