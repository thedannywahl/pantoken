[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / CdnProvider

# อินเทอร์เฟซ: CdnProvider

<span class="instui-pill -color-warning pantoken-doc-tag">อัลฟา</span>

A CDN that can serve npm package files. Providers never hardcode a package name — they only
know how to shape a URL from a [CdnFile](CdnFile.md).

## คุณสมบัติ

### id

> **id**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">อัลฟา</span>

Stable identifier, e.g. `"jsdelivr"`.

***

### label

> **label**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">อัลฟา</span>

Human-readable name, e.g. `"jsDelivr"`.

***

### supportsCombine

> **supportsCombine**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">อัลฟา</span>

Whether [CdnProvider.buildCombineUrl](#buildcombineurl) is implemented.

## เมธอด

### buildUrl()

> **buildUrl**(`file`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">อัลฟา</span>

Builds the URL for a single file.

#### พารามิเตอร์

##### file

[`CdnFile`](CdnFile.md)

##### options?

`CdnBuildOptions`

#### คืนค่า

`string`

***

### buildCombineUrl()?

> `optional` **buildCombineUrl**(`files`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">อัลฟา</span>

Builds one URL that serves multiple files concatenated together. Required iff `supportsCombine`.

#### พารามิเตอร์

##### files

[`CdnFile`](CdnFile.md)[]

##### options?

`CdnBuildOptions`

#### คืนค่า

`string`
