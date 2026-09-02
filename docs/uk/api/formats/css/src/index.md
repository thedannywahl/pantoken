[pantoken](../../../index.md) / css

# css

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

`@pantoken/css` — emit Instructure design tokens as `@property`-typed CSS.

[toCss](functions/toCss.md) turns any token IR into CSS; [css](variables/css.md) is the ready-made `rebrand` stylesheet and
[leanCss](variables/leanCss.md) is a lean variant that drops the full `--instui-icon-*` set (the ~1,777 icon data-URIs
that dominate the sheet) for CDN/embed delivery — ~a sixth the size over the wire. Both carry the
elevation + focus-outline foundation (composite custom properties whose pure builders live in
`@pantoken/utils`), so a component sheet resolves its shadows and focus ring against the token sheet
alone. A DOM side-effect entry lives at `@pantoken/css/inject`; static files at
`@pantoken/css/style.css` and `@pantoken/css/style.lean.css`.

## Інтерфейси

- [CssSection](interfaces/CssSection.md)
- [ToCssOptions](interfaces/ToCssOptions.md)

## Змінні

- [css](variables/css.md)
- [leanCss](variables/leanCss.md)

## Функції

- [buildCssFile](functions/buildCssFile.md)
- [toCss](functions/toCss.md)

## Посилання

### default

Renames and re-exports [css](variables/css.md)
