[pantoken](../../../../index.md) / theme-custom-media

# theme-custom-media

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-theme-custom-media` — author with theme custom-idents
(`@media (theme: &lt;name&gt;)`) and/or `@media (--theme-*)` aliases, then emit concrete CSS for a
chosen target theme.

The plugin expands built-in `--theme-*` and `--breakpoint-*` aliases, prunes non-target theme
branches, strips matching `theme:*` clauses from kept queries, unwraps always-true theme-only media
wrappers, and removes `@custom-media --theme-*`/`--breakpoint-*` declarations from emitted CSS.

## Rajapinnat

- [ThemeCustomMediaOptions](interfaces/ThemeCustomMediaOptions.md)

## Tyyppialiasit

- [Theme](type-aliases/Theme.md)

## Muuttujat

- [themeCustomMedia](variables/themeCustomMedia.md)

## Viittaukset

### default

Renames and re-exports [themeCustomMedia](variables/themeCustomMedia.md)
