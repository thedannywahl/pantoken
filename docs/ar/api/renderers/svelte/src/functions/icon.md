[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / icon

# دالة: icon()

> **icon**(`node`, `name`): [`ActionResult`](../interfaces/ActionResult.md)

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

إجراء Svelte: `<span use:icon={"arrow-left"} />` يقوم بعرض SVG المضمّن للأيقونة داخل العقدة.

## المعلمات

### node

`Element`

العنصر المضيف.

### name

`string`

اسم الأيقونة.

## القيم المرجعة

[`ActionResult`](../interfaces/ActionResult.md)

## مثال

```svelte
<script>
  import { icon } from "@pantoken/svelte";
  import "@pantoken/css";
</script>

<span use:icon={"arrow-left"} />
```
