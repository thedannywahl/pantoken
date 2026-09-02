[pantoken](../../../index.md) / canvas-theme-editor

# canvas-theme-editor

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

`@pantoken/canvas-theme-editor` — upload-ready `theme.css`/`theme.js` for Canvas LMS's Theme
Editor, pre-wired to pantoken's CDN-hosted CSS. Consumed by `@pantoken/scaffold`'s
`canvas-theme-editor` platform; also usable standalone.

`THEME_CSS`/`THEME_JS` are the jsDelivr-default, unpinned output — use [buildTheme](functions/buildTheme.md) to
target a different CDN provider, pin a version, or swap in other pantoken/third-party assets.

## Arayüzler

- [ThemeStrings](interfaces/ThemeStrings.md)
- [BuildThemeOptions](interfaces/BuildThemeOptions.md)
- [CdnFile](interfaces/CdnFile.md)
- [CdnProvider](interfaces/CdnProvider.md)

## Tür Takma Adları

- [ThemeVariant](type-aliases/ThemeVariant.md)
- [ThemeMode](type-aliases/ThemeMode.md)

## Değişkenler

- [THEME\_CSS](variables/THEME_CSS.md)
- [THEME\_JS](variables/THEME_JS.md)
- [ENGLISH\_THEME\_STRINGS](variables/ENGLISH_THEME_STRINGS.md)
- [DEFAULT\_THEME\_CSS\_ASSETS](variables/DEFAULT_THEME_CSS_ASSETS.md)
- [DEFAULT\_THEME\_FONT\_ASSETS](variables/DEFAULT_THEME_FONT_ASSETS.md)
- [DEFAULT\_THEME\_JS\_ASSETS](variables/DEFAULT_THEME_JS_ASSETS.md)
- [CDN\_PROVIDERS](variables/CDN_PROVIDERS.md)
- [DEFAULT\_CDN\_PROVIDER\_ID](variables/DEFAULT_CDN_PROVIDER_ID.md)

## Fonksiyonlar

- [defaultThemeCssAssets](functions/defaultThemeCssAssets.md)
- [buildThemeCss](functions/buildThemeCss.md)
- [buildThemeJs](functions/buildThemeJs.md)
- [buildTheme](functions/buildTheme.md)
