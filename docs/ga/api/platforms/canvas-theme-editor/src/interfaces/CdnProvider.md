[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / CdnProvider

# Comhéadan: CdnProvider

<span class="instui-pill -color-warning pantoken-doc-tag">Ailfha</span>

A CDN that can serve npm package files. Providers never hardcode a package name — they only
know how to shape a URL from a [CdnFile](CdnFile.md).

## Airíonna

### id

> **id**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Ailfha</span>

Stable identifier, e.g. `"jsdelivr"`.

***

### label

> **label**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Ailfha</span>

Human-readable name, e.g. `"jsDelivr"`.

***

### supportsCombine

> **supportsCombine**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Ailfha</span>

Whether [CdnProvider.buildCombineUrl](#buildcombineurl) is implemented.

## Modhanna

### buildUrl()

> **buildUrl**(`file`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Ailfha</span>

Builds the URL for a single file.

#### Paraiméadair

##### file

[`CdnFile`](CdnFile.md)

##### options?

`CdnBuildOptions`

#### Tuairisceáin

`string`

***

### buildCombineUrl()?

> `optional` **buildCombineUrl**(`files`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Ailfha</span>

Builds one URL that serves multiple files concatenated together. Required iff `supportsCombine`.

#### Paraiméadair

##### files

[`CdnFile`](CdnFile.md)[]

##### options?

`CdnBuildOptions`

#### Tuairisceáin

`string`
