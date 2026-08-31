[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / progress

# Variable: progress

> `const` **progress**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-progress&gt;` — un indicador horitzontal recolzat per semàntica nativa `&lt;progress&gt;` o `&lt;meter&gt;`.

`value-now`/`value` impulsen `--value`, mentre que `min` i `value-max`/`max` impulsen l'interval. Un mínim zero renderitza un `&lt;progress&gt;` natiu; un mínim diferent de zero renderitza `&lt;meter&gt;`. Afegeix l'atribut booleà `should-animate` per transitar els canvis de mesura durant mig segon. `variant` mapeja el component a `-color-&lt;variant&gt;` i `label` proporciona el seu nom accessible.

## Example

```html
<instui-progress value-now="40" value-max="60" variant="success" should-animate></instui-progress>
```
