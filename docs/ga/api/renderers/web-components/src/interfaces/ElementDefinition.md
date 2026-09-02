[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / ElementDefinition

# Comhéadan: ElementDefinition

<span class="instui-pill -color-warning pantoken-doc-tag">Ailfha</span>

One registered custom element: its base tag name plus a `define` that registers it via the context.

## Airíonna

### name

> `readonly` **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Ailfha</span>

The base tag name, e.g. `button` (minted to `&lt;instui-button&gt;`/`&lt;x-button&gt;` by the active prefix).

## Modhanna

### define()

> **define**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Ailfha</span>

Register the element into `ctx.registry`, using only the shared, prefix-aware helpers.

#### Paraiméadair

##### ctx

[`RegisterContext`](RegisterContext.md)

#### Tuairisceáin

`void`
