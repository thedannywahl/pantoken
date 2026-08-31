[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / BuildThemeOptions

# Interface: BuildThemeOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Ընտրանքներ [buildTheme](../functions/buildTheme.md)/[buildThemeCss](../functions/buildThemeCss.md)/[buildThemeJs](../functions/buildThemeJs.md)-ի համար:

## Properties

### provider?

> `optional` **provider?**: `string` \| [`CdnProvider`](CdnProvider.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

CDN մատակարար՝ կառուցել URL-ներ համար: Հայտնի jsDelivr-ից, երբ բաց են:

---

### version?

> `optional` **version?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Պտուտ տարբերակ ամբողջ ակտիվի համար ներքևում, որը չի նշում իր սեփական `version`:

---

### theme?

> `optional` **theme?**: [`ThemeVariant`](../type-aliases/ThemeVariant.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Թոքեն թեմայի տեսակ: Հայտնի `"rebrand"`: Անտեսվում է, երբ `css` տրամադրվում է:

---

### mode?

> `optional` **mode?**: [`ThemeMode`](../type-aliases/ThemeMode.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Վերաբրենդել թոքեն ռեժիմ: Հայտնի `"light"`: Անտեսվում է `rebrand` թեմայից դուրս, կամ երբ `css` տրամադրվում է:

---

### css?

> `optional` **css?**: readonly [`CdnFile`](CdnFile.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Բաղադրիչի ոճի թերթերը: Հայտնի [defaultThemeCssAssets](../functions/defaultThemeCssAssets.md) `theme`/`mode`-ի համար:

---

### fonts?

> `optional` **fonts?**: readonly [`CdnFile`](CdnFile.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Տառատեսակ թերթ(եր): Հայտնի [DEFAULT\_THEME\_FONT\_ASSETS](../variables/DEFAULT_THEME_FONT_ASSETS.md):

---

### js?

> `optional` **js?**: readonly [`CdnFile`](CdnFile.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Սցենար(ներ): Հայտնի [DEFAULT\_THEME\_JS\_ASSETS](../variables/DEFAULT_THEME_JS_ASSETS.md):

---

### strings?

> `optional` **strings?**: `Partial`\<[`ThemeStrings`](ThemeStrings.md)>>>>\>

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Թարգմանված մեկնաբանական տողերը: Հայտնի [ENGLISH\_THEME\_STRINGS](../variables/ENGLISH_THEME_STRINGS.md):
