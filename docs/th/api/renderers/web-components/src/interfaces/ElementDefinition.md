[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / ElementDefinition

# อินเทอร์เฟซ: ElementDefinition

<span class="instui-pill -color-warning pantoken-doc-tag">อัลฟา</span>

One registered custom element: its base tag name plus a `define` that registers it via the context.

## คุณสมบัติ

### name

> `readonly` **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">อัลฟา</span>

The base tag name, e.g. `button` (minted to `&lt;instui-button&gt;`/`&lt;x-button&gt;` by the active prefix).

## เมธอด

### define()

> **define**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">อัลฟา</span>

Register the element into `ctx.registry`, using only the shared, prefix-aware helpers.

#### พารามิเตอร์

##### ctx

[`RegisterContext`](RegisterContext.md)

#### คืนค่า

`void`
