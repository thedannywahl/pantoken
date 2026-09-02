[pantoken](../../../../index.md) / simple-icons

# simple-icons

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-simple-icons` — bring Simple Icons brand glyphs into pantoken.

The plugin defines a `tokens` hook (emit selected brand glyphs as `&lt;image&gt;` tokens, so they flow
to CSS and native too) *and* a `rehype` hook (resolve `:brand:` codes at render). Same plugin,
either layer — the generalized form of the `mcp-stack/portal` icon factory.

## Giao diện

- [SimpleIcon](interfaces/SimpleIcon.md)
- [SimpleIconsOptions](interfaces/SimpleIconsOptions.md)

## Bí danh kiểu

- [SimpleIconsRegistry](type-aliases/SimpleIconsRegistry.md)

## Hàm

- [toExportName](functions/toExportName.md)
- [defaultRegistry](functions/defaultRegistry.md)
- [simpleIcons](functions/simpleIcons.md)

## Tham chiếu

### default

Renames and re-exports [simpleIcons](functions/simpleIcons.md)
