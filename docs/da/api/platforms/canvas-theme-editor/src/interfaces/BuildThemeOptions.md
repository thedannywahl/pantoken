[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / BuildThemeOptions

# Interface: BuildThemeOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Muligheder for [buildTheme](../functions/buildTheme.md)/[buildThemeCss](../functions/buildThemeCss.md)/[buildThemeJs](../functions/buildThemeJs.md).

## Properties

### provider?

> `optional` **provider?**: `string` \| [`CdnProvider`](CdnProvider.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

CDN-leverandøren til at bygge URL'er for. Som standard jsDelivr når den udelades.

---

### version?

> `optional` **version?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Fastgør versionen for hvert aktiv nedenfor, der ikke angiver sin egen `version`.

---

### theme?

> `optional` **theme?**: [`ThemeVariant`](../type-aliases/ThemeVariant.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Token tema-variant. Standard `"rebrand"`. Ignoreres når `css` leveres.

---

### mode?

> `optional` **mode?**: [`ThemeMode`](../type-aliases/ThemeMode.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Omdøb token tilstand. Standard `"light"`. Ignoreres uden for `rebrand` tema, eller når `css` leveres.

---

### css?

> `optional` **css?**: readonly [`CdnFile`](CdnFile.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Komponent-stilarke. Standard [defaultThemeCssAssets](../functions/defaultThemeCssAssets.md) for `theme`/`mode`.

---

### fonts?

> `optional` **fonts?**: readonly [`CdnFile`](CdnFile.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Font ark(e). Standard [DEFAULT\_THEME\_FONT\_ASSETS](../variables/DEFAULT_THEME_FONT_ASSETS.md).

---

### js?

> `optional` **js?**: readonly [`CdnFile`](CdnFile.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Script(e). Standard [DEFAULT\_THEME\_JS\_ASSETS](../variables/DEFAULT_THEME_JS_ASSETS.md).

---

### strings?

> `optional` **strings?**: `Partial`\<[`ThemeStrings`](ThemeStrings.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Oversat kommentar-strenge. Standard [ENGLISH\_THEME\_STRINGS](../variables/ENGLISH_THEME_STRINGS.md).
