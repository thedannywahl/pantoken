[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / ElementDefinition

# Ինտերֆեյս: ElementDefinition

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

Մեկ գրանցված custom element. դրա բազային tag անունը և `define` որը գրանցում է այն context-ի միջոցով։

## Առանձնահատկություններ

### name

> `readonly` **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

Բազային tag անունը, օր. `button` (ստեղծվել է `&lt;instui-button&gt;`/`&lt;x-button&gt;` ակտիվ prefix-ի կողմից)։

## Մեթոդներ

### define()

> **define**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

Գրանցել տարրը `ctx.registry`-ի մեջ՝ օգտագործելով միայն կիսված, prefix-գիտակ օգնականներ։

#### Պարամետրեր

##### ctx

[`RegisterContext`](RegisterContext.md)

#### Վերադարձվող արժեք

`void`
