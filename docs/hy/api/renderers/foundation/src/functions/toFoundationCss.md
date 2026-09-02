[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# Ֆունկցիա: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Արձակել բարակ runtime CSS վերլուծ՝ Foundation-ի համալիր դասեր թեմայական `var(--instui-*)`-ի հետ:

## Պարամետրեր

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## Վերադարձվող արժեք

`string`

Վերլուծ CSS տողը:

## Օրինակ

**Վերլուծ շրջանակի մեջ տեղակայել**

```ts
toFoundationCss({ scope: ".instui" });
```
