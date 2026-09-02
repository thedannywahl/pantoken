[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / CdnProvider

# Entèfas: CdnProvider

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

A CDN that can serve npm package files. Providers never hardcode a package name — they only
know how to shape a URL from a [CdnFile](CdnFile.md).

## Pwopriyete

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

## Metòd

### buildUrl()

> **buildUrl**(`file`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Builds the URL for a single file.

#### Paramèt

##### file

[`CdnFile`](CdnFile.md)

##### options?

`CdnBuildOptions`

#### Retounen

`string`

***

### buildCombineUrl()?

> `optional` **buildCombineUrl**(`files`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Builds one URL that serves multiple files concatenated together. Required iff `supportsCombine`.

#### Paramèt

##### files

[`CdnFile`](CdnFile.md)[]

##### options?

`CdnBuildOptions`

#### Retounen

`string`
