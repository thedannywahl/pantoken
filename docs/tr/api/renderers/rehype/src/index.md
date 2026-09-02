[pantoken](../../../index.md) / rehype

# rehype

<span class="instui-pill -color-danger pantoken-doc-tag">Deneysel</span>

`@pantoken/rehype` — render `:icon:` codes as inline SVG.

The plugin walks hast text nodes and replaces `:code:` tokens with an inline SVG element,
resolving each code through a chain: plugin `rehype` resolvers first, then any explicit
`resolve`, then the built-in `@pantoken/icons` set. It ports `rehype-instui-markdown` onto the
shared icon manifest.

## Arayüzler

- [RehypeOptions](interfaces/RehypeOptions.md)

## Fonksiyonlar

- [rehypePantokenIcons](functions/rehypePantokenIcons.md)

## Başvurular

### default

Renames and re-exports [rehypePantokenIcons](functions/rehypePantokenIcons.md)
