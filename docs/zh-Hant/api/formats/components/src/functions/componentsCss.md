[pantoken](../../../../index.md) / [formats/components/src](../index.md) / componentsCss

# 函式: componentsCss()

> **componentsCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Build the aggregated component stylesheet: every component's rules in the `COMPONENTS` concat order.
The size-alias and alias twins are appended PER COMPONENT (within its own chunk) so each alias
documents on its own page — the aliases are discovered from each record's `@alias {@link -x}` or
`@deprecated {@link -x}` metadata (see `withAliases`), not a central hand-kept list. The
`--instui-elevation-*` shadow scale the components reference is defined in the token sheet
(`@pantoken/css`), so it's no longer inlined here.

## 參數

### options?

[`ComponentOptions`](../interfaces/ComponentOptions.md) = `{}`

[ComponentOptions](../interfaces/ComponentOptions.md).

## 回傳

`string`

The CSS string.
