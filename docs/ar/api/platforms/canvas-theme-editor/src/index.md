[pantoken](../../../index.md) / canvas-theme-editor

# canvas-theme-editor

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

`@pantoken/canvas-theme-editor` — جاهز للتحميل `theme.css`/`theme.js` لمحرر السمة في Canvas LMS
مهيأ مسبقًا لملفات CSS المستضافة على شبكة CDN الخاصة بـ pantoken. يستهلكه نظام `canvas-theme-editor` التابع لـ `@pantoken/scaffold`;
ويمكن استخدامه بشكل مستقل أيضًا.

`THEME_CSS`/`THEME_JS` هما المخرجان الافتراضيان لـ jsDelivr، غير مثبتي الإصدار — استخدم [buildTheme](functions/buildTheme.md) لاستهداف مزود CDN مختلف، تثبيت إصدار، أو استبدالهما بأصول pantoken/جهات خارجية أخرى.

## واجهات

- [ThemeStrings](interfaces/ThemeStrings.md)
- [BuildThemeOptions](interfaces/BuildThemeOptions.md)
- [CdnFile](interfaces/CdnFile.md)
- [CdnProvider](interfaces/CdnProvider.md)

## أسماء أنواع مستعارة

- [ThemeVariant](type-aliases/ThemeVariant.md)
- [ThemeMode](type-aliases/ThemeMode.md)

## المتغيرات

- [THEME\_CSS](variables/THEME_CSS.md)
- [THEME\_JS](variables/THEME_JS.md)
- [ENGLISH\_THEME\_STRINGS](variables/ENGLISH_THEME_STRINGS.md)
- [DEFAULT\_THEME\_CSS\_ASSETS](variables/DEFAULT_THEME_CSS_ASSETS.md)
- [DEFAULT\_THEME\_FONT\_ASSETS](variables/DEFAULT_THEME_FONT_ASSETS.md)
- [DEFAULT\_THEME\_JS\_ASSETS](variables/DEFAULT_THEME_JS_ASSETS.md)
- [CDN\_PROVIDERS](variables/CDN_PROVIDERS.md)
- [DEFAULT\_CDN\_PROVIDER\_ID](variables/DEFAULT_CDN_PROVIDER_ID.md)

## الدوال

- [defaultThemeCssAssets](functions/defaultThemeCssAssets.md)
- [buildThemeCss](functions/buildThemeCss.md)
- [buildThemeJs](functions/buildThemeJs.md)
- [buildTheme](functions/buildTheme.md)
