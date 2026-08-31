[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / ElementDefinition

# Interface: ElementDefinition

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Մեկ գրանցված custom element. դրա բազային tag անունը և `define` որը գրանցում է այն context-ի միջոցով։

## Properties

### name

> `readonly` **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Բազային tag անունը, օր. `button` (ստեղծվել է `&lt;instui-button&gt;`/`&lt;x-button&gt;` ակտիվ prefix-ի կողմից)։

## Methods

### define()

> **define**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Գրանցել տարրը `ctx.registry`-ի մեջ՝ օգտագործելով միայն կիսված, prefix-գիտակ օգնականներ։

#### Parameters

##### ctx

[`RegisterContext`](RegisterContext.md)

#### Returns

`void`
