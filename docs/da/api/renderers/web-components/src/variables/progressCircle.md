[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / progressCircle

# Variable: progressCircle

> `const` **progressCircle**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-progress-circle&gt;` — en cirkulær indikator understøttet af oprindelig `&lt;progress&gt;` eller `&lt;meter&gt;` semantik.

`value-now`/`value` styrer `--value`, mens `min` og `value-max`/`max` styrer området. Et nul-minimum gengiver et oprindeligt `&lt;progress&gt;`; et ikke-nul-minimum gengiver `&lt;meter&gt;`. Tilføj det booleske `should-animate` attribut for at animere fra nul ved montering; `animation-delay` er en millisekund-forsinkelse. `label` tilsidesætter tilgængelighadsnavnet (som ellers som standard er procentdelen).

## Example

```html
<instui-progress-circle value-now="40" value-max="60" should-animate></instui-progress-circle>
```
