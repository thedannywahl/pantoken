[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / CdnProvider

# Διεπαφή: CdnProvider

<span class="instui-pill -color-warning pantoken-doc-tag">Άλφα</span>

A CDN that can serve npm package files. Providers never hardcode a package name — they only
know how to shape a URL from a [CdnFile](CdnFile.md).

## Ιδιότητες

### id

> **id**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Άλφα</span>

Stable identifier, e.g. `"jsdelivr"`.

***

### label

> **label**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Άλφα</span>

Human-readable name, e.g. `"jsDelivr"`.

***

### supportsCombine

> **supportsCombine**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Άλφα</span>

Whether [CdnProvider.buildCombineUrl](#buildcombineurl) is implemented.

## Μέθοδοι

### buildUrl()

> **buildUrl**(`file`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Άλφα</span>

Builds the URL for a single file.

#### Παράμετροι

##### file

[`CdnFile`](CdnFile.md)

##### options?

`CdnBuildOptions`

#### Επιστρέφει

`string`

***

### buildCombineUrl()?

> `optional` **buildCombineUrl**(`files`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Άλφα</span>

Builds one URL that serves multiple files concatenated together. Required iff `supportsCombine`.

#### Παράμετροι

##### files

[`CdnFile`](CdnFile.md)[]

##### options?

`CdnBuildOptions`

#### Επιστρέφει

`string`
