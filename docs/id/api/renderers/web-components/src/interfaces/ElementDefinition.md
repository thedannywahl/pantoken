[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / ElementDefinition

# Antarmuka: ElementDefinition

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

One registered custom element: its base tag name plus a `define` that registers it via the context.

## Properti

### name

> `readonly` **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

The base tag name, e.g. `button` (minted to `&lt;instui-button&gt;`/`&lt;x-button&gt;` by the active prefix).

## Metode

### define()

> **define**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Register the element into `ctx.registry`, using only the shared, prefix-aware helpers.

#### Parameter

##### ctx

[`RegisterContext`](RegisterContext.md)

#### Mengembalikan

`void`
