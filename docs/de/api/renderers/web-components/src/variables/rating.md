[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / rating

# Variable: rating

> `const` **rating**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-rating&gt;` — a star rating with `role="img"`. `value` is the number of filled stars, `max`
the total (default 5), and `label` overrides the accessible name (defaults to `value/max`). Stars
render as inline SVG glyphs (solid = filled), sized to the text.

## Beispiel

```html
<instui-rating value="4" max="5" label="4 out of 5 stars"></instui-rating>
```
