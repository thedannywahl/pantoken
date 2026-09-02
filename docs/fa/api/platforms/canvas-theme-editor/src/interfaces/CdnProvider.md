[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / CdnProvider

# رابط: CdnProvider

<span class="instui-pill -color-warning pantoken-doc-tag">آلفا</span>

A CDN that can serve npm package files. Providers never hardcode a package name — they only
know how to shape a URL from a [CdnFile](CdnFile.md).

## خصوصیات

### id

> **id**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">آلفا</span>

Stable identifier, e.g. `"jsdelivr"`.

***

### label

> **label**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">آلفا</span>

Human-readable name, e.g. `"jsDelivr"`.

***

### supportsCombine

> **supportsCombine**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">آلفا</span>

Whether [CdnProvider.buildCombineUrl](#buildcombineurl) is implemented.

## متدها

### buildUrl()

> **buildUrl**(`file`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">آلفا</span>

Builds the URL for a single file.

#### پارامترها

##### file

[`CdnFile`](CdnFile.md)

##### options?

`CdnBuildOptions`

#### مقدار بازگشتی

`string`

***

### buildCombineUrl()?

> `optional` **buildCombineUrl**(`files`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">آلفا</span>

Builds one URL that serves multiple files concatenated together. Required iff `supportsCombine`.

#### پارامترها

##### files

[`CdnFile`](CdnFile.md)[]

##### options?

`CdnBuildOptions`

#### مقدار بازگشتی

`string`
