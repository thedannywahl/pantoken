[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / CdnProvider

# Ինտերֆեյս: CdnProvider

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

CDN, որը կարող է տրամադրել npm փաթեթային ֆայլերը: Մատակարարները երբեք չեն կոշկոտում փաթեթի անունը — նրանք միայն գիտեն, թե ինչպես URL կազմել [CdnFile](CdnFile.md)-ից:

## Առանձնահատկություններ

### id

> **id**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

Կայուն նույնացուցիչ, օր․ `"jsdelivr"`։

***

### label

> **label**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

Մարդկային ընթեռնելի անուն, օր․ `"jsDelivr"`։

***

### supportsCombine

> **supportsCombine**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

Արդյո՞ք [CdnProvider.buildCombineUrl](#buildcombineurl) իրականացված է։

## Մեթոդներ

### buildUrl()

> **buildUrl**(`file`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

Կառուցում է մեկ ֆայլի URL հասցեն։

#### Պարամետրեր

##### file

[`CdnFile`](CdnFile.md)

##### options?

`CdnBuildOptions`

#### Վերադարձվող արժեք

`string`

***

### buildCombineUrl()?

> `optional` **buildCombineUrl**(`files`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

Կառուցում է մեկ URL, որը ծառայում է մի քանի ֆայլերի միացված ներկայացմանը։ Պահանջվում է միայն եւ միայն եթե `supportsCombine`։

#### Պարամետրեր

##### files

[`CdnFile`](CdnFile.md)[]

##### options?

`CdnBuildOptions`

#### Վերադարձվող արժեք

`string`
