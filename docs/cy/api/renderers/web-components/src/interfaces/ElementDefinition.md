[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / ElementDefinition

# Rhyngwyneb: ElementDefinition

<span class="instui-pill -color-warning pantoken-doc-tag">Alffa</span>

One registered custom element: its base tag name plus a `define` that registers it via the context.

## Eiddo

### name

> `readonly` **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alffa</span>

The base tag name, e.g. `button` (minted to `&lt;instui-button&gt;`/`&lt;x-button&gt;` by the active prefix).

## Dulliau

### define()

> **define**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Alffa</span>

Register the element into `ctx.registry`, using only the shared, prefix-aware helpers.

#### Paramedrau

##### ctx

[`RegisterContext`](RegisterContext.md)

#### Yn dychwelyd

`void`
