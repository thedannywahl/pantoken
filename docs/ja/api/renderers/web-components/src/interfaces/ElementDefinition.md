[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / ElementDefinition

# インターフェース: ElementDefinition

<span class="instui-pill -color-warning pantoken-doc-tag">アルファ</span>

One registered custom element: its base tag name plus a `define` that registers it via the context.

## プロパティ

### name

> `readonly` **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">アルファ</span>

The base tag name, e.g. `button` (minted to `&lt;instui-button&gt;`/`&lt;x-button&gt;` by the active prefix).

## メソッド

### define()

> **define**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">アルファ</span>

Register the element into `ctx.registry`, using only the shared, prefix-aware helpers.

#### パラメーター

##### ctx

[`RegisterContext`](RegisterContext.md)

#### 戻り値

`void`
