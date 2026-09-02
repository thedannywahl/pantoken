[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / ElementDefinition

# ממשק: ElementDefinition

<span class="instui-pill -color-warning pantoken-doc-tag">אלפא</span>

One registered custom element: its base tag name plus a `define` that registers it via the context.

## תכונות

### name

> `readonly` **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">אלפא</span>

The base tag name, e.g. `button` (minted to `&lt;instui-button&gt;`/`&lt;x-button&gt;` by the active prefix).

## שיטות

### define()

> **define**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">אלפא</span>

Register the element into `ctx.registry`, using only the shared, prefix-aware helpers.

#### פרמטרים

##### ctx

[`RegisterContext`](RegisterContext.md)

#### מחזיר

`void`
