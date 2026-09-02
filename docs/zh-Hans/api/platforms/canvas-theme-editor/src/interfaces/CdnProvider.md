[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / CdnProvider

# 接口: CdnProvider

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

A CDN that can serve npm package files. Providers never hardcode a package name — they only
know how to shape a URL from a [CdnFile](CdnFile.md).

## 属性

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

## 方法

### buildUrl()

> **buildUrl**(`file`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Builds the URL for a single file.

#### 参数

##### file

[`CdnFile`](CdnFile.md)

##### options?

`CdnBuildOptions`

#### 返回值

`string`

***

### buildCombineUrl()?

> `optional` **buildCombineUrl**(`files`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Builds one URL that serves multiple files concatenated together. Required iff `supportsCombine`.

#### 参数

##### files

[`CdnFile`](CdnFile.md)[]

##### options?

`CdnBuildOptions`

#### 返回值

`string`
