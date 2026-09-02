[pantoken](../../../../../index.md) / [plugins/postcss/theme-custom-media/src](../index.md) / themeCustomMedia

# ตัวแปร: themeCustomMedia

> `const` **themeCustomMedia**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

Create the theme custom-media lowering plugin.

Supports authoring with either direct theme custom-idents in media features (for example,
`(theme: canvas)`) or built-in `@custom-media --theme-*` aliases.

## Type Declaration

## พารามิเตอร์

### options?

[`ThemeCustomMediaOptions`](../interfaces/ThemeCustomMediaOptions.md)

[ThemeCustomMediaOptions](../interfaces/ThemeCustomMediaOptions.md).

## คืนค่า

[`Plugin`](https://postcss.org/api/#plugin)

A PostCSS [Plugin](https://postcss.org/api/#plugin).

### postcss

> **postcss**: `true`

Required PostCSS plugin marker.
