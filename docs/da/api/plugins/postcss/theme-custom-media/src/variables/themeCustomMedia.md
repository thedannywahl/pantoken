[pantoken](../../../../../index.md) / [plugins/postcss/theme-custom-media/src](../index.md) / themeCustomMedia

# Variable: themeCustomMedia

> `const` **themeCustomMedia**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Opret tema custom-media sænknings-plugin'en.

Understøtter forfattelse med enten direkte tema brugerdefinerede-identifikatorer i media features (for eksempel `(theme: canvas)`) eller indbyggede `@custom-media --theme-*`-alias.

## Type Declaration

## Parameters

### options?

[`ThemeCustomMediaOptions`](../interfaces/ThemeCustomMediaOptions.md)

[ThemeCustomMediaOptions](../interfaces/ThemeCustomMediaOptions.md).

## Returns

[`Plugin`](https://postcss.org/api/#plugin)

Et PostCSS [Plugin](https://postcss.org/api/#plugin).

### postcss

> **postcss**: `true`

Påkrævet PostCSS plugin marker.
