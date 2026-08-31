[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# Function: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Emet la superposició CSS fina en temps d'execució: tema les classes compilades de Foundation amb `var(--instui-*)`.

## Parameters

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## Returns

`string`

La cadena CSS de superposició.

## Example

**Abast de la superposició a un contenidor**

```ts
toFoundationCss({ scope: ".instui" });
```
