[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / BuildThemeOptions

# Interfície: BuildThemeOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Opcions per a [buildTheme](../functions/buildTheme.md)/[buildThemeCss](../functions/buildThemeCss.md)/[buildThemeJs](../functions/buildThemeJs.md).

## Propietats

### provider?

> `optional` **provider?**: `string` \| [`CdnProvider`](CdnProvider.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

El proveïdor de CDN per al qual construir URL. Per defecte a jsDelivr si s'omet.

***

### version?

> `optional` **version?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Ancla la versió per a cada actiu següent que no especifiqui el seu `version`.

***

### theme?

> `optional` **theme?**: [`ThemeVariant`](../type-aliases/ThemeVariant.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Variant de tema de token. Per defecte `"rebrand"`. Ignorat quan es proporciona `css`.

***

### mode?

> `optional` **mode?**: [`ThemeMode`](../type-aliases/ThemeMode.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Mode de token de rebranding. Per defecte `"light"`. Ignorat fora del tema `rebrand`, o quan es proporciona `css`.

***

### css?

> `optional` **css?**: readonly [`CdnFile`](CdnFile.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Fulls d'estils de component. Per defecte [defaultThemeCssAssets](../functions/defaultThemeCssAssets.md) per a `theme`/`mode`.

***

### fonts?

> `optional` **fonts?**: readonly [`CdnFile`](CdnFile.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Full/s de font. Per defecte [DEFAULT\_THEME\_FONT\_ASSETS](../variables/DEFAULT_THEME_FONT_ASSETS.md).

***

### js?

> `optional` **js?**: readonly [`CdnFile`](CdnFile.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Script/s. Per defecte [DEFAULT\_THEME\_JS\_ASSETS](../variables/DEFAULT_THEME_JS_ASSETS.md).

***

### strings?

> `optional` **strings?**: `Partial`\<[`ThemeStrings`](ThemeStrings.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Cadenes de comentaris traduïdes. Per defecte [ENGLISH\_THEME\_STRINGS](../variables/ENGLISH_THEME_STRINGS.md).
