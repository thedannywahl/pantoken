[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / CdnProvider

# ממשק: CdnProvider

<span class="instui-pill -color-warning pantoken-doc-tag">אלפא</span>

A CDN that can serve npm package files. Providers never hardcode a package name — they only
know how to shape a URL from a [CdnFile](CdnFile.md).

## תכונות

### id

> **id**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">אלפא</span>

Stable identifier, e.g. `"jsdelivr"`.

***

### label

> **label**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">אלפא</span>

Human-readable name, e.g. `"jsDelivr"`.

***

### supportsCombine

> **supportsCombine**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">אלפא</span>

Whether [CdnProvider.buildCombineUrl](#buildcombineurl) is implemented.

## שיטות

### buildUrl()

> **buildUrl**(`file`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">אלפא</span>

Builds the URL for a single file.

#### פרמטרים

##### file

[`CdnFile`](CdnFile.md)

##### options?

`CdnBuildOptions`

#### מחזיר

`string`

***

### buildCombineUrl()?

> `optional` **buildCombineUrl**(`files`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">אלפא</span>

Builds one URL that serves multiple files concatenated together. Required iff `supportsCombine`.

#### פרמטרים

##### files

[`CdnFile`](CdnFile.md)[]

##### options?

`CdnBuildOptions`

#### מחזיר

`string`
