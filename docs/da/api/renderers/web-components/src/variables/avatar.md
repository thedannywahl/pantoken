[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / avatar

# Variabel: avatar

> `const` **avatar**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-avatar&gt;` — en cirkulær (eller rektangulær) avatar. `variant` kortlægges til `-color-&lt;variant&gt;`,
`size` til `-size-&lt;size&gt;`, og `shape="rectangle"` til `-shape-rectangle`; slot-indhold er
initialerne, eller en `&lt;img&gt;` (brug en absolut/CDN `src`) til at vise et foto.

## Eksempel

```html
<instui-avatar size="lg" margin="small">JS</instui-avatar>
<instui-avatar shape="rectangle" variant="green" margin="small">AB</instui-avatar>
```
