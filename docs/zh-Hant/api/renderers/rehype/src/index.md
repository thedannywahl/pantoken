[pantoken](../../../index.md) / rehype

# rehype

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

`@pantoken/rehype` — render `:icon:` codes as inline SVG.

The plugin walks hast text nodes and replaces `:code:` tokens with an inline SVG element,
resolving each code through a chain: plugin `rehype` resolvers first, then any explicit
`resolve`, then the built-in `@pantoken/icons` set. It ports `rehype-instui-markdown` onto the
shared icon manifest.

## 介面

- [RehypeOptions](interfaces/RehypeOptions.md)

## 函式

- [rehypePantokenIcons](functions/rehypePantokenIcons.md)

## 參考

### default

Renames and re-exports [rehypePantokenIcons](functions/rehypePantokenIcons.md)
