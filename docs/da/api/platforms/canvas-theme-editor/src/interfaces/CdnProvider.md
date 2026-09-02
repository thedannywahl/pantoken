[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / CdnProvider

# Interface: CdnProvider

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Et CDN, der kan servere npm-pakkefiler. Providere hardcoder aldrig et pakkenavn — de ved kun, hvordan man danner en URL fra en [CdnFile](CdnFile.md).

## Egenskaber

### id

> **id**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Stabil identifikator, f.eks. `"jsdelivr"`.

***

### label

> **label**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Menneskeligt læsbart navn, f.eks. `"jsDelivr"`.

***

### supportsCombine

> **supportsCombine**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Om [CdnProvider.buildCombineUrl](#buildcombineurl) er implementeret.

## Metoder

### buildUrl()

> **buildUrl**(`file`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Bygger URL'en for en enkelt fil.

#### Parametre

##### file

[`CdnFile`](CdnFile.md)

##### options?

`CdnBuildOptions`

#### Returnerer

`string`

***

### buildCombineUrl()?

> `optional` **buildCombineUrl**(`files`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Bygger en URL, der serverer flere filer sammenkædet sammen. Påkrævet hvis og kun hvis `supportsCombine`.

#### Parametre

##### files

[`CdnFile`](CdnFile.md)[]

##### options?

`CdnBuildOptions`

#### Returnerer

`string`
