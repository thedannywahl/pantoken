[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# Function: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Արձակել բարակ runtime CSS վերլուծ՝ Foundation-ի համալիր դասեր թեմայական `var(--instui-*)`-ի հետ:

## Parameters

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## Returns

`string`

Վերլուծ CSS տողը:

## Example

**Վերլուծ շրջանակի մեջ տեղակայել**

```ts
toFoundationCss({ scope: ".instui" });
```
