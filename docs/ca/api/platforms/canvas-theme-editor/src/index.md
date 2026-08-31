[pantoken](../../../index.md) / canvas-theme-editor

# canvas-theme-editor

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`@pantoken/canvas-theme-editor` — `theme.css`/`theme.js` llest per pujar a l'Editor de Temes de Canvas LMS, pre-cablejat al CSS allotjat a CDN de pantoken. Consumit per la plataforma `canvas-theme-editor` de `@pantoken/scaffold`; també utilizable de manera independent.

`THEME_CSS`/`THEME_JS` és la sortida per defecte de jsDelivr sense anclar — utilitza [buildTheme](functions/buildTheme.md) per dirigir-se a un proveïdor de CDN diferent, anclar una versió, o intercanviar altres actius de pantoken/tercers.

## Interfaces

- [ThemeStrings](interfaces/ThemeStrings.md)
- [BuildThemeOptions](interfaces/BuildThemeOptions.md)
- [CdnFile](interfaces/CdnFile.md)
- [CdnProvider](interfaces/CdnProvider.md)

## Type Aliases

- [ThemeVariant](type-aliases/ThemeVariant.md)
- [ThemeMode](type-aliases/ThemeMode.md)

## Variables

- [THEME\_CSS](variables/THEME_CSS.md)
- [THEME\_JS](variables/THEME_JS.md)
- [ENGLISH\_THEME\_STRINGS](variables/ENGLISH_THEME_STRINGS.md)
- [DEFAULT\_THEME\_CSS\_ASSETS](variables/DEFAULT_THEME_CSS_ASSETS.md)
- [DEFAULT\_THEME\_FONT\_ASSETS](variables/DEFAULT_THEME_FONT_ASSETS.md)
- [DEFAULT\_THEME\_JS\_ASSETS](variables/DEFAULT_THEME_JS_ASSETS.md)
- [CDN\_PROVIDERS](variables/CDN_PROVIDERS.md)
- [DEFAULT\_CDN\_PROVIDER\_ID](variables/DEFAULT_CDN_PROVIDER_ID.md)

## Functions

- [defaultThemeCssAssets](functions/defaultThemeCssAssets.md)
- [buildThemeCss](functions/buildThemeCss.md)
- [buildThemeJs](functions/buildThemeJs.md)
- [buildTheme](functions/buildTheme.md)
