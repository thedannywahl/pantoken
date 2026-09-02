[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / ElementDefinition

# Διεπαφή: ElementDefinition

<span class="instui-pill -color-warning pantoken-doc-tag">Άλφα</span>

One registered custom element: its base tag name plus a `define` that registers it via the context.

## Ιδιότητες

### name

> `readonly` **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Άλφα</span>

The base tag name, e.g. `button` (minted to `&lt;instui-button&gt;`/`&lt;x-button&gt;` by the active prefix).

## Μέθοδοι

### define()

> **define**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Άλφα</span>

Register the element into `ctx.registry`, using only the shared, prefix-aware helpers.

#### Παράμετροι

##### ctx

[`RegisterContext`](RegisterContext.md)

#### Επιστρέφει

`void`
