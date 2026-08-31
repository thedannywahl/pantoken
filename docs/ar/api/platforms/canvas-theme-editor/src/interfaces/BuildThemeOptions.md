[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / BuildThemeOptions

# Interface: BuildThemeOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

خيارات [buildTheme](../functions/buildTheme.md)/[buildThemeCss](../functions/buildThemeCss.md)/[buildThemeJs](../functions/buildThemeJs.md).

## Properties

### provider?

> `optional` **provider?**: `string` \| [`CdnProvider`](CdnProvider.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

موفر CDN لإنشاء عناوين URL له. الافتراضي jsDelivr عند الحذف.

---

### version?

> `optional` **version?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

تثبيت الإصدار لكل أصل أدناه لا يحدد `version` الخاص به.

---

### theme?

> `optional` **theme?**: [`ThemeVariant`](../type-aliases/ThemeVariant.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

متغير موضوع الرموز. الافتراضي `"rebrand"`. يتم تجاهله عند توفير `css`.

---

### mode?

> `optional` **mode?**: [`ThemeMode`](../type-aliases/ThemeMode.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

وضع إعادة تسمية الرموز. الافتراضي `"light"`. يتم تجاهله خارج موضوع `rebrand`، أو عند توفير `css`.

---

### css?

> `optional` **css?**: readonly [`CdnFile`](CdnFile.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

أوراق نمط المكون. الافتراضي [defaultThemeCssAssets](../functions/defaultThemeCssAssets.md) لـ `theme`/`mode`.

---

### fonts?

> `optional` **fonts?**: readonly [`CdnFile`](CdnFile.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

ورقة(أوراق) الخط. الافتراضي [DEFAULT\_THEME\_FONT\_ASSETS](../variables/DEFAULT_THEME_FONT_ASSETS.md).

---

### js?

> `optional` **js?**: readonly [`CdnFile`](CdnFile.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

البرنامج(جات). الافتراضي [DEFAULT\_THEME\_JS\_ASSETS](../variables/DEFAULT_THEME_JS_ASSETS.md).

---

### strings?

> `optional` **strings?**: `Partial`\<[`ThemeStrings`](ThemeStrings.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

سلاسل التعليقات المترجمة. الافتراضي [ENGLISH\_THEME\_STRINGS](../variables/ENGLISH_THEME_STRINGS.md).
