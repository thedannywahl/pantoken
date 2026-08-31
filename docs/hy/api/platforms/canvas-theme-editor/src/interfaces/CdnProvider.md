[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / CdnProvider

# Interface: CdnProvider

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

CDN, որը կարող է տրամադրել npm փաթեթային ֆայլերը: Մատակարարները երբեք չեն կոշկոտում փաթեթի անունը — նրանք միայն գիտեն, թե ինչպես URL կազմել [CdnFile](CdnFile.md)-ից:

## Properties

### id

> **id**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Կայուն նույնացուցիչ, օր․ `"jsdelivr"`։

---

### label

> **label**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Մարդկային ընթեռնելի անուն, օր․ `"jsDelivr"`։

---

### supportsCombine

> **supportsCombine**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Արդյո՞ք [CdnProvider.buildCombineUrl](#buildcombineurl) իրականացված է։

## Methods

### buildUrl()

> **buildUrl**(`file`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Կառուցում է մեկ ֆայլի URL հասցեն։

#### Parameters

##### file

[`CdnFile`](CdnFile.md)

##### options?

`CdnBuildOptions`

#### Returns

`string`

---

### buildCombineUrl()?

> `optional` **buildCombineUrl**(`files`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Կառուցում է մեկ URL, որը ծառայում է մի քանի ֆայլերի միացված ներկայացմանը։ Պահանջվում է միայն եւ միայն եթե `supportsCombine`։

#### Parameters

##### files

[`CdnFile`](CdnFile.md)[]

##### options?

`CdnBuildOptions`

#### Returns

`string`
