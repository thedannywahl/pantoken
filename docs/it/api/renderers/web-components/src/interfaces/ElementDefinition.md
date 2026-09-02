[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / ElementDefinition

# Interfaccia: ElementDefinition

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

One registered custom element: its base tag name plus a `define` that registers it via the context.

## Proprietà

### name

> `readonly` **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

The base tag name, e.g. `button` (minted to `&lt;instui-button&gt;`/`&lt;x-button&gt;` by the active prefix).

## Metodi

### define()

> **define**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Register the element into `ctx.registry`, using only the shared, prefix-aware helpers.

#### Parametri

##### ctx

[`RegisterContext`](RegisterContext.md)

#### Restituisce

`void`
