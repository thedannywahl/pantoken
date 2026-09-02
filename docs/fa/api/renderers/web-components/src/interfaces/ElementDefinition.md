[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / ElementDefinition

# رابط: ElementDefinition

<span class="instui-pill -color-warning pantoken-doc-tag">آلفا</span>

One registered custom element: its base tag name plus a `define` that registers it via the context.

## خصوصیات

### name

> `readonly` **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">آلفا</span>

The base tag name, e.g. `button` (minted to `&lt;instui-button&gt;`/`&lt;x-button&gt;` by the active prefix).

## متدها

### define()

> **define**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">آلفا</span>

Register the element into `ctx.registry`, using only the shared, prefix-aware helpers.

#### پارامترها

##### ctx

[`RegisterContext`](RegisterContext.md)

#### مقدار بازگشتی

`void`
