[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / progressCircle

# Variable: progressCircle

> `const` **progressCircle**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-progress-circle&gt;` — un indicador circular recolzat per semàntica nativa `&lt;progress&gt;` o `&lt;meter&gt;`.

`value-now`/`value` impulsen `--value`, mentre que `min` i `value-max`/`max` impulsen l'interval. Un mínim zero renderitza un `&lt;progress&gt;` natiu; un mínim diferent de zero renderitza `&lt;meter&gt;`. Afegeix l'atribut booleà `should-animate` per animar-se des de zero en montar; `animation-delay` és una demora en mil·lisegons. `label` substiteix el nom accessible (que en cas contrari per defecte al percentatge).

## Example

```html
<instui-progress-circle value-now="40" value-max="60" should-animate></instui-progress-circle>
```
