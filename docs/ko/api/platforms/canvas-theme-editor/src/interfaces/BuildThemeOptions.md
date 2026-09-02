[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / BuildThemeOptions

# 인터페이스: BuildThemeOptions

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

Options for [buildTheme](../functions/buildTheme.md)/[buildThemeCss](../functions/buildThemeCss.md)/[buildThemeJs](../functions/buildThemeJs.md).

## 속성

### provider?

> `optional` **provider?**: `string` \| [`CdnProvider`](CdnProvider.md)

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

The CDN provider to build URLs for. Defaults to jsDelivr when omitted.

***

### version?

> `optional` **version?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

Pins the version for every asset below that doesn't specify its own `version`.

***

### theme?

> `optional` **theme?**: [`ThemeVariant`](../type-aliases/ThemeVariant.md)

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

Token theme variant. Defaults to `"rebrand"`. Ignored when `css` is supplied.

***

### mode?

> `optional` **mode?**: [`ThemeMode`](../type-aliases/ThemeMode.md)

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

Rebrand token mode. Defaults to `"light"`. Ignored outside the `rebrand` theme, or when `css` is supplied.

***

### css?

> `optional` **css?**: readonly [`CdnFile`](CdnFile.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

Component-style sheets. Defaults to [defaultThemeCssAssets](../functions/defaultThemeCssAssets.md) for `theme`/`mode`.

***

### fonts?

> `optional` **fonts?**: readonly [`CdnFile`](CdnFile.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

Font sheet(s). Defaults to [DEFAULT\_THEME\_FONT\_ASSETS](../variables/DEFAULT_THEME_FONT_ASSETS.md).

***

### js?

> `optional` **js?**: readonly [`CdnFile`](CdnFile.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

Script(s). Defaults to [DEFAULT\_THEME\_JS\_ASSETS](../variables/DEFAULT_THEME_JS_ASSETS.md).

***

### strings?

> `optional` **strings?**: `Partial`\<[`ThemeStrings`](ThemeStrings.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

Translated comment strings. Defaults to [ENGLISH\_THEME\_STRINGS](../variables/ENGLISH_THEME_STRINGS.md).
