[pantoken](../../../index.md) / canvas-theme-editor

# canvas-theme-editor

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`@pantoken/canvas-theme-editor` — upload-klar `theme.css`/`theme.js` til Canvas LMS's tema-
redigering, på forhånd konfigureret til pantoken's CDN-hosted CSS. Forbrugt af `@pantoken/scaffold`'s
`canvas-theme-editor` platform; også brugbar selvstændigt.

`THEME_CSS`/`THEME_JS` er jsDelivr-standard, ikke-fastgjort output — brug [buildTheme](functions/buildTheme.md) til
at målrette en anden CDN-leverandør, fastgøre en version eller bytte andre pantoken/tredjepartsaktivet.

## Interfaces

- [ThemeStrings](interfaces/ThemeStrings.md)
- [BuildThemeOptions](interfaces/BuildThemeOptions.md)
- [CdnFile](interfaces/CdnFile.md)
- [CdnProvider](interfaces/CdnProvider.md)

## Typealiaser

- [ThemeVariant](type-aliases/ThemeVariant.md)
- [ThemeMode](type-aliases/ThemeMode.md)

## Variabler

- [THEME\_CSS](variables/THEME_CSS.md)
- [THEME\_JS](variables/THEME_JS.md)
- [ENGLISH\_THEME\_STRINGS](variables/ENGLISH_THEME_STRINGS.md)
- [DEFAULT\_THEME\_CSS\_ASSETS](variables/DEFAULT_THEME_CSS_ASSETS.md)
- [DEFAULT\_THEME\_FONT\_ASSETS](variables/DEFAULT_THEME_FONT_ASSETS.md)
- [DEFAULT\_THEME\_JS\_ASSETS](variables/DEFAULT_THEME_JS_ASSETS.md)
- [CDN\_PROVIDERS](variables/CDN_PROVIDERS.md)
- [DEFAULT\_CDN\_PROVIDER\_ID](variables/DEFAULT_CDN_PROVIDER_ID.md)

## Funktioner

- [defaultThemeCssAssets](functions/defaultThemeCssAssets.md)
- [buildThemeCss](functions/buildThemeCss.md)
- [buildThemeJs](functions/buildThemeJs.md)
- [buildTheme](functions/buildTheme.md)
