[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / ElementDefinition

# इंटरफेस: ElementDefinition

<span class="instui-pill -color-warning pantoken-doc-tag">अल्फा</span>

One registered custom element: its base tag name plus a `define` that registers it via the context.

## प्रॉपर्टीज

### name

> `readonly` **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">अल्फा</span>

The base tag name, e.g. `button` (minted to `&lt;instui-button&gt;`/`&lt;x-button&gt;` by the active prefix).

## मिथड्स

### define()

> **define**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">अल्फा</span>

Register the element into `ctx.registry`, using only the shared, prefix-aware helpers.

#### पैरामीटर

##### ctx

[`RegisterContext`](RegisterContext.md)

#### वापसी

`void`
