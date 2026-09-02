[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / CdnProvider

# インターフェース: CdnProvider

<span class="instui-pill -color-warning pantoken-doc-tag">アルファ</span>

A CDN that can serve npm package files. Providers never hardcode a package name — they only
know how to shape a URL from a [CdnFile](CdnFile.md).

## プロパティ

### id

> **id**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">アルファ</span>

Stable identifier, e.g. `"jsdelivr"`.

***

### label

> **label**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">アルファ</span>

Human-readable name, e.g. `"jsDelivr"`.

***

### supportsCombine

> **supportsCombine**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">アルファ</span>

Whether [CdnProvider.buildCombineUrl](#buildcombineurl) is implemented.

## メソッド

### buildUrl()

> **buildUrl**(`file`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">アルファ</span>

Builds the URL for a single file.

#### パラメーター

##### file

[`CdnFile`](CdnFile.md)

##### options?

`CdnBuildOptions`

#### 戻り値

`string`

***

### buildCombineUrl()?

> `optional` **buildCombineUrl**(`files`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">アルファ</span>

Builds one URL that serves multiple files concatenated together. Required iff `supportsCombine`.

#### パラメーター

##### files

[`CdnFile`](CdnFile.md)[]

##### options?

`CdnBuildOptions`

#### 戻り値

`string`
