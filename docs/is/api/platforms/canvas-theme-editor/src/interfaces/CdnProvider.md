[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / CdnProvider

# Viðmót: CdnProvider

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

A CDN that can serve npm package files. Providers never hardcode a package name — they only
know how to shape a URL from a [CdnFile](CdnFile.md).

## Eiginleikar

### id

> **id**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Stable identifier, e.g. `"jsdelivr"`.

***

### label

> **label**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Human-readable name, e.g. `"jsDelivr"`.

***

### supportsCombine

> **supportsCombine**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Whether [CdnProvider.buildCombineUrl](#buildcombineurl) is implemented.

## Aðferðir

### buildUrl()

> **buildUrl**(`file`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Builds the URL for a single file.

#### Færibreytur

##### file

[`CdnFile`](CdnFile.md)

##### options?

`CdnBuildOptions`

#### Skilar

`string`

***

### buildCombineUrl()?

> `optional` **buildCombineUrl**(`files`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Builds one URL that serves multiple files concatenated together. Required iff `supportsCombine`.

#### Færibreytur

##### files

[`CdnFile`](CdnFile.md)[]

##### options?

`CdnBuildOptions`

#### Skilar

`string`
