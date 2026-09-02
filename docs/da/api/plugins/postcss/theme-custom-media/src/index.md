[pantoken](../../../../index.md) / theme-custom-media

# theme-custom-media

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-theme-custom-media` — forfat med tema brugerdefinerede-identifikatorer (`@media (theme: &lt;name&gt;)`) og/eller `@media (--theme-*)`-alias, og udsted derefter konkret CSS for et valgt mål-tema.

Plugin'en udvider indbyggede `--theme-*`- og `--breakpoint-*`-alias, fjerner ikke-mål-tema-grene, fjerner matchende `theme:*`-klausuler fra bevaret forespørgsler, udpakker altid-sande tema-eneste medie-wrappere, og fjerner `@custom-media --theme-*`/`--breakpoint-*`-deklarationer fra udsendt CSS.

## Interfaces

- [ThemeCustomMediaOptions](interfaces/ThemeCustomMediaOptions.md)

## Typealiaser

- [Theme](type-aliases/Theme.md)

## Variabler

- [themeCustomMedia](variables/themeCustomMedia.md)

## Referencer

### default

Omdøber og gen-eksporterer [themeCustomMedia](variables/themeCustomMedia.md)
