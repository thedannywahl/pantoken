[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / CdnProvider

# Interfície: CdnProvider

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Una CDN que pot servir fitxers de paquet npm. Els proveïdors mai no codifiquen un nom de paquet — només
saben com formar una URL a partir d'una [CdnFile](CdnFile.md).

## Propietats

### id

> **id**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Identificador estable, p. ex. `"jsdelivr"`.

***

### label

> **label**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Nom llegible per humans, p. ex. `"jsDelivr"`.

***

### supportsCombine

> **supportsCombine**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Si [CdnProvider.buildCombineUrl](#buildcombineurl) està implementat.

## Mètodes

### buildUrl()

> **buildUrl**(`file`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Construeix l'URL per a un sol fitxer.

#### Paràmetres

##### file

[`CdnFile`](CdnFile.md)

##### options?

`CdnBuildOptions`

#### Retorna

`string`

***

### buildCombineUrl()?

> `optional` **buildCombineUrl**(`files`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Construeix una URL que serveix múltiples fitxers concatenats. Necessari ssi `supportsCombine`.

#### Paràmetres

##### files

[`CdnFile`](CdnFile.md)[]

##### options?

`CdnBuildOptions`

#### Retorna

`string`
