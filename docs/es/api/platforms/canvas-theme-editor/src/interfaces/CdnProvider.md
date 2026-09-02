[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / CdnProvider

# Interfaz: CdnProvider

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

A CDN that can serve npm package files. Providers never hardcode a package name — they only
know how to shape a URL from a [CdnFile](CdnFile.md).

## Propiedades

### id

> **id**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Stable identifier, e.g. `"jsdelivr"`.

***

### label

> **label**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Human-readable name, e.g. `"jsDelivr"`.

***

### supportsCombine

> **supportsCombine**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Whether [CdnProvider.buildCombineUrl](#buildcombineurl) is implemented.

## Métodos

### buildUrl()

> **buildUrl**(`file`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Builds the URL for a single file.

#### Parámetros

##### file

[`CdnFile`](CdnFile.md)

##### options?

`CdnBuildOptions`

#### Devuelve

`string`

***

### buildCombineUrl()?

> `optional` **buildCombineUrl**(`files`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Builds one URL that serves multiple files concatenated together. Required iff `supportsCombine`.

#### Parámetros

##### files

[`CdnFile`](CdnFile.md)[]

##### options?

`CdnBuildOptions`

#### Devuelve

`string`
