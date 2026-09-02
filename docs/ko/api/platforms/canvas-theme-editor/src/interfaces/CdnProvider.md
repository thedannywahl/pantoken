[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / CdnProvider

# 인터페이스: CdnProvider

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

A CDN that can serve npm package files. Providers never hardcode a package name — they only
know how to shape a URL from a [CdnFile](CdnFile.md).

## 속성

### id

> **id**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

Stable identifier, e.g. `"jsdelivr"`.

***

### label

> **label**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

Human-readable name, e.g. `"jsDelivr"`.

***

### supportsCombine

> **supportsCombine**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

Whether [CdnProvider.buildCombineUrl](#buildcombineurl) is implemented.

## 메서드

### buildUrl()

> **buildUrl**(`file`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

Builds the URL for a single file.

#### 매개변수

##### file

[`CdnFile`](CdnFile.md)

##### options?

`CdnBuildOptions`

#### 반환값

`string`

***

### buildCombineUrl()?

> `optional` **buildCombineUrl**(`files`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

Builds one URL that serves multiple files concatenated together. Required iff `supportsCombine`.

#### 매개변수

##### files

[`CdnFile`](CdnFile.md)[]

##### options?

`CdnBuildOptions`

#### 반환값

`string`
