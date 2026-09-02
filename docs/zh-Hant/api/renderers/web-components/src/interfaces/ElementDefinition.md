[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / ElementDefinition

# 介面: ElementDefinition

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha（內測）</span>

One registered custom element: its base tag name plus a `define` that registers it via the context.

## 屬性

### name

> `readonly` **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha（內測）</span>

The base tag name, e.g. `button` (minted to `&lt;instui-button&gt;`/`&lt;x-button&gt;` by the active prefix).

## 方法

### define()

> **define**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha（內測）</span>

Register the element into `ctx.registry`, using only the shared, prefix-aware helpers.

#### 參數

##### ctx

[`RegisterContext`](RegisterContext.md)

#### 回傳

`void`
