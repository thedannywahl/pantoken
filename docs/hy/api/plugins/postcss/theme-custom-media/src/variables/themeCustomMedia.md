[pantoken](../../../../../index.md) / [plugins/postcss/theme-custom-media/src](../index.md) / themeCustomMedia

# Variable: themeCustomMedia

> `const` **themeCustomMedia**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Ստեղծել theme custom-media lowering plugin-ը:

Աջակցում հեղինակությունը ուղղակի theme custom-idents-ով media features-ում (օրինակ,
`(theme: canvas)`) կամ հաշմանդամ `@custom-media --theme-*` անվանումներ:

## Type Declaration

## Parameters

### options?

[`ThemeCustomMediaOptions`](../interfaces/ThemeCustomMediaOptions.md)

[ThemeCustomMediaOptions](../interfaces/ThemeCustomMediaOptions.md).

## Returns

[`Plugin`](https://postcss.org/api/#plugin)

PostCSS [Plugin](https://postcss.org/api/#plugin):

### postcss

> **postcss**: `true`

Պահանջվող PostCSS plugin նշիչ:
