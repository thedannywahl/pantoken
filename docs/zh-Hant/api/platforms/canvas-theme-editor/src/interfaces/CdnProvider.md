[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / CdnProvider

# 介面: CdnProvider

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha（內測）</span>

A CDN that can serve npm package files. Providers never hardcode a package name — they only
know how to shape a URL from a [CdnFile](CdnFile.md).

## 屬性

### id

> **id**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha（內測）</span>

Stable identifier, e.g. `"jsdelivr"`.

***

### label

> **label**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha（內測）</span>

Human-readable name, e.g. `"jsDelivr"`.

***

### supportsCombine

> **supportsCombine**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha（內測）</span>

Whether [CdnProvider.buildCombineUrl](#buildcombineurl) is implemented.

## 方法

### buildUrl()

> **buildUrl**(`file`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha（內測）</span>

Builds the URL for a single file.

#### 參數

##### file

[`CdnFile`](CdnFile.md)

##### options?

`CdnBuildOptions`

#### 回傳

`string`

***

### buildCombineUrl()?

> `optional` **buildCombineUrl**(`files`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha（內測）</span>

Builds one URL that serves multiple files concatenated together. Required iff `supportsCombine`.

#### 參數

##### files

[`CdnFile`](CdnFile.md)[]

##### options?

`CdnBuildOptions`

#### 回傳

`string`
