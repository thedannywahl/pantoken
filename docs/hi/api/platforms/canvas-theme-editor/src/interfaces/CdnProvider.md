[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / CdnProvider

# इंटरफेस: CdnProvider

<span class="instui-pill -color-warning pantoken-doc-tag">अल्फा</span>

A CDN that can serve npm package files. Providers never hardcode a package name — they only
know how to shape a URL from a [CdnFile](CdnFile.md).

## प्रॉपर्टीज

### id

> **id**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">अल्फा</span>

Stable identifier, e.g. `"jsdelivr"`.

***

### label

> **label**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">अल्फा</span>

Human-readable name, e.g. `"jsDelivr"`.

***

### supportsCombine

> **supportsCombine**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">अल्फा</span>

Whether [CdnProvider.buildCombineUrl](#buildcombineurl) is implemented.

## मिथड्स

### buildUrl()

> **buildUrl**(`file`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">अल्फा</span>

Builds the URL for a single file.

#### पैरामीटर

##### file

[`CdnFile`](CdnFile.md)

##### options?

`CdnBuildOptions`

#### वापसी

`string`

***

### buildCombineUrl()?

> `optional` **buildCombineUrl**(`files`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">अल्फा</span>

Builds one URL that serves multiple files concatenated together. Required iff `supportsCombine`.

#### पैरामीटर

##### files

[`CdnFile`](CdnFile.md)[]

##### options?

`CdnBuildOptions`

#### वापसी

`string`
