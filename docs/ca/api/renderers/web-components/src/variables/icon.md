[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / icon

# Variable: icon

> `const` **icon**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

`&lt;instui-icon&gt;` — un glyph SVG en línia del conjunt d'icones pantoken. L'atribut `name` escull el glyph, `size` (qualsevol longitud CSS, per defecte `1em`) el dimensiona, `color` (qualsevol color CSS) el tinta, i `margin` afegeix espai al seu voltant (paraules clau d'InstUI com `small`). Representa l'SVG al seu propi DOM lleuger, dimensionat/colorit mitjançant estils en línia a l'hoste, així que hereta `currentColor` com el text.

## Exemple

```html
<instui-icon name="arrow-left" margin="small"></instui-icon>
<instui-icon name="star" size="1.5rem" color="gold" margin="small"></instui-icon>
```
