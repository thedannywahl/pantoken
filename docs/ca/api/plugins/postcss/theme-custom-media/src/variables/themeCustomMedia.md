[pantoken](../../../../../index.md) / [plugins/postcss/theme-custom-media/src](../index.md) / themeCustomMedia

# Variable: themeCustomMedia

> `const` **themeCustomMedia**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Creeu el connector de baixada de mitjans personalitzats del tema.

Admet la creació amb identificadors personalitzats del tema directament en característiques de mitjans (per exemple,
`(theme: canvas)`) o alias `@custom-media --theme-*` integrats.

## Type Declaration

## Parameters

### options?

[`ThemeCustomMediaOptions`](../interfaces/ThemeCustomMediaOptions.md)

[ThemeCustomMediaOptions](../interfaces/ThemeCustomMediaOptions.md).

## Returns

[`Plugin`](https://postcss.org/api/#plugin)

Un [connector](https://postcss.org/api/#plugin) de PostCSS.

### postcss

> **postcss**: `true`

Marcador requerida del connector de PostCSS.
