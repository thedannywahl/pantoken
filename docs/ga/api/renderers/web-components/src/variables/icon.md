[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / icon

# Athróg: icon

> `const` **icon**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Ailfha</span>

`&lt;instui-icon&gt;` — an inline SVG glyph from the pantoken icon set. The `name` attribute picks the
glyph, `size` (any CSS length, default `1em`) sizes it, `color` (any CSS color) tints it, and
`margin` adds spacing around it (InstUI keywords like `small`). Renders the SVG into its own light
DOM, sized/coloured via inline styles on the host, so it inherits `currentColor` like text.

## Sampla

```html
<instui-icon name="arrow-left" margin="small"></instui-icon>
<instui-icon name="star" size="1.5rem" color="gold" margin="small"></instui-icon>
```
