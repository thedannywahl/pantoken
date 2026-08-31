[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / icon

# Variable: icon

> `const` **icon**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-icon&gt;` — en inline SVG-glyphe fra pantoken-ikonindstillingen. Attributten `name` vælger
glyphen, `size` (enhver CSS-længde, standard `1em`) størrelsen på den, `color` (enhver CSS-farve) toner den, og
`margin` tilføjer afstand omkring den (InstUI-nøgleord som `small`). Gengiver SVG'en ind i sit eget klare
DOM, størrelse/farvet via inline-stilarter på værten, så det arver `currentColor` som tekst.

## Example

```html
<instui-icon name="arrow-left" margin="small"></instui-icon>
<instui-icon name="star" size="1.5rem" color="gold" margin="small"></instui-icon>
```
