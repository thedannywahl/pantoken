[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / CdnProvider

# Интерфейс: CdnProvider

<span class="instui-pill -color-warning pantoken-doc-tag">Альфа</span>

A CDN that can serve npm package files. Providers never hardcode a package name — they only
know how to shape a URL from a [CdnFile](CdnFile.md).

## Свойства

### id

> **id**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Альфа</span>

Stable identifier, e.g. `"jsdelivr"`.

***

### label

> **label**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Альфа</span>

Human-readable name, e.g. `"jsDelivr"`.

***

### supportsCombine

> **supportsCombine**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Альфа</span>

Whether [CdnProvider.buildCombineUrl](#buildcombineurl) is implemented.

## Методы

### buildUrl()

> **buildUrl**(`file`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Альфа</span>

Builds the URL for a single file.

#### Параметры

##### file

[`CdnFile`](CdnFile.md)

##### options?

`CdnBuildOptions`

#### Возвращаемое значение

`string`

***

### buildCombineUrl()?

> `optional` **buildCombineUrl**(`files`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Альфа</span>

Builds one URL that serves multiple files concatenated together. Required iff `supportsCombine`.

#### Параметры

##### files

[`CdnFile`](CdnFile.md)[]

##### options?

`CdnBuildOptions`

#### Возвращаемое значение

`string`
