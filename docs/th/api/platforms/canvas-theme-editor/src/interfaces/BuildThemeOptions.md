[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / BuildThemeOptions

# อินเทอร์เฟซ: BuildThemeOptions

<span class="instui-pill -color-warning pantoken-doc-tag">อัลฟา</span>

Options for [buildTheme](../functions/buildTheme.md)/[buildThemeCss](../functions/buildThemeCss.md)/[buildThemeJs](../functions/buildThemeJs.md).

## คุณสมบัติ

### provider?

> `optional` **provider?**: `string` \| [`CdnProvider`](CdnProvider.md)

<span class="instui-pill -color-warning pantoken-doc-tag">อัลฟา</span>

The CDN provider to build URLs for. Defaults to jsDelivr when omitted.

***

### version?

> `optional` **version?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">อัลฟา</span>

Pins the version for every asset below that doesn't specify its own `version`.

***

### theme?

> `optional` **theme?**: [`ThemeVariant`](../type-aliases/ThemeVariant.md)

<span class="instui-pill -color-warning pantoken-doc-tag">อัลฟา</span>

Token theme variant. Defaults to `"rebrand"`. Ignored when `css` is supplied.

***

### mode?

> `optional` **mode?**: [`ThemeMode`](../type-aliases/ThemeMode.md)

<span class="instui-pill -color-warning pantoken-doc-tag">อัลฟา</span>

Rebrand token mode. Defaults to `"light"`. Ignored outside the `rebrand` theme, or when `css` is supplied.

***

### css?

> `optional` **css?**: readonly [`CdnFile`](CdnFile.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">อัลฟา</span>

Component-style sheets. Defaults to [defaultThemeCssAssets](../functions/defaultThemeCssAssets.md) for `theme`/`mode`.

***

### fonts?

> `optional` **fonts?**: readonly [`CdnFile`](CdnFile.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">อัลฟา</span>

Font sheet(s). Defaults to [DEFAULT\_THEME\_FONT\_ASSETS](../variables/DEFAULT_THEME_FONT_ASSETS.md).

***

### js?

> `optional` **js?**: readonly [`CdnFile`](CdnFile.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">อัลฟา</span>

Script(s). Defaults to [DEFAULT\_THEME\_JS\_ASSETS](../variables/DEFAULT_THEME_JS_ASSETS.md).

***

### strings?

> `optional` **strings?**: `Partial`\<[`ThemeStrings`](ThemeStrings.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">อัลฟา</span>

Translated comment strings. Defaults to [ENGLISH\_THEME\_STRINGS](../variables/ENGLISH_THEME_STRINGS.md).
