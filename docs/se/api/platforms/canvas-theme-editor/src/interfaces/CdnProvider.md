[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / CdnProvider

# Interfáhta: CdnProvider

<span class="instui-pill -color-warning pantoken-doc-tag">Alffa</span>

A CDN that can serve npm package files. Providers never hardcode a package name — they only
know how to shape a URL from a [CdnFile](CdnFile.md).

## Properties

### id

> **id**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alffa</span>

Stable identifier, e.g. `"jsdelivr"`.

***

### label

> **label**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alffa</span>

Human-readable name, e.g. `"jsDelivr"`.

***

### supportsCombine

> **supportsCombine**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alffa</span>

Whether [CdnProvider.buildCombineUrl](#buildcombineurl) is implemented.

## Metodat

### buildUrl()

> **buildUrl**(`file`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alffa</span>

Builds the URL for a single file.

#### Parametera

##### file

[`CdnFile`](CdnFile.md)

##### options?

`CdnBuildOptions`

#### Gullii / Gávdnat

`string`

***

### buildCombineUrl()?

> `optional` **buildCombineUrl**(`files`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alffa</span>

Builds one URL that serves multiple files concatenated together. Required iff `supportsCombine`.

#### Parametera

##### files

[`CdnFile`](CdnFile.md)[]

##### options?

`CdnBuildOptions`

#### Gullii / Gávdnat

`string`
