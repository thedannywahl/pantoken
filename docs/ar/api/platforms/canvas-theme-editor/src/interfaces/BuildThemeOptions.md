[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / BuildThemeOptions

# واجهة: BuildThemeOptions

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

خيارات لـ [buildTheme](../functions/buildTheme.md)/[buildThemeCss](../functions/buildThemeCss.md)/[buildThemeJs](../functions/buildThemeJs.md).

## الخصائص

### provider?

> `optional` **provider?**: `string` \| [`CdnProvider`](CdnProvider.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

مزود CDN لبناء عناوين URL. القيمة الافتراضية هي jsDelivr إذا لم يُذكر.

***

### version?

> `optional` **version?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

يثبّت الإصدار لكل أصل أدناه لا يحدد `version` خاصًا به.

***

### theme?

> `optional` **theme?**: [`ThemeVariant`](../type-aliases/ThemeVariant.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

متغيّر سمة التوكن. القيمة الافتراضية `"rebrand"`. يتم تجاهله عند توفير `css`.

***

### mode?

> `optional` **mode?**: [`ThemeMode`](../type-aliases/ThemeMode.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

وضع إعادة العلامة التجارية للتوكن. القيمة الافتراضية `"light"`. يتم تجاهله خارج سمة `rebrand` أو عند توفير `css`.

***

### css?

> `optional` **css?**: readonly [`CdnFile`](CdnFile.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

أوراق أنماط المكوّن. القيمة الافتراضية هي [defaultThemeCssAssets](../functions/defaultThemeCssAssets.md) لـ `theme`/`mode`.

***

### fonts?

> `optional` **fonts?**: readonly [`CdnFile`](CdnFile.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

أوراق الخطوط. القيمة الافتراضية هي [DEFAULT\_THEME\_FONT\_ASSETS](../variables/DEFAULT_THEME_FONT_ASSETS.md).

***

### js?

> `optional` **js?**: readonly [`CdnFile`](CdnFile.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

السكربتات. القيمة الافتراضية هي [DEFAULT\_THEME\_JS\_ASSETS](../variables/DEFAULT_THEME_JS_ASSETS.md).

***

### strings?

> `optional` **strings?**: `Partial`\<[`ThemeStrings`](ThemeStrings.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

سلاسل التعليقات المترجمة. القيمة الافتراضية هي [ENGLISH\_THEME\_STRINGS](../variables/ENGLISH_THEME_STRINGS.md).
