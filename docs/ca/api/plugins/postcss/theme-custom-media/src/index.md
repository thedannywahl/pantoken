[pantoken](../../../../index.md) / theme-custom-media

# theme-custom-media

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-theme-custom-media` — creeu amb identificadors personalitzats del tema
(`@media (theme: &lt;name&gt;)`) i/o alias `@media (--theme-*)`, després emeteu CSS concret per a un
tema objectiu escollit.

El connector expandeix els alias `--theme-*` i `--breakpoint-*` integrats, poda les branques del tema no objectiu, elimina les clàusules `theme:*` coincidents de les consultes mantingudes, desembolica els embolcalls de mitjans només del tema sempre certs, i elimina les declaracions `@custom-media --theme-*`/`--breakpoint-*` del CSS emès.

## Interfícies

- [ThemeCustomMediaOptions](interfaces/ThemeCustomMediaOptions.md)

## Àlies de tipus

- [Theme](type-aliases/Theme.md)

## Variables

- [themeCustomMedia](variables/themeCustomMedia.md)

## Referències

### default

Canvia el nom i reexporta [themeCustomMedia](variables/themeCustomMedia.md)
