[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# Function: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Udsend det tynde runtime CSS-overlay: tema Foundations kompilerede klasser med `var(--instui-*)`.

## Parameters

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## Returns

`string`

CSS-strengen til overlay.

## Example

**Omfang overlay til en container**

```ts
toFoundationCss({ scope: ".instui" });
```
