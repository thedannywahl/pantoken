[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / CdnProvider

# Interface: CdnProvider

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Una CDN que pot servir fitxers de paquet npm. Els proveïdors mai no codifiquen un nom de paquet — només
saben com formar una URL a partir d'una [CdnFile](CdnFile.md).

## Properties

### id

> **id**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Identificador estable, p. ex. `"jsdelivr"`.

---

### label

> **label**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Nom llegible per humans, p. ex. `"jsDelivr"`.

---

### supportsCombine

> **supportsCombine**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Si [CdnProvider.buildCombineUrl](#buildcombineurl) està implementat.

## Methods

### buildUrl()

> **buildUrl**(`file`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Construeix l'URL per a un sol fitxer.

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

Construeix una URL que serveix múltiples fitxers concatenats. Necessari ssi `supportsCombine`.

#### Parameters

##### files

[`CdnFile`](CdnFile.md)[]

##### options?

`CdnBuildOptions`

#### Returns

`string`
