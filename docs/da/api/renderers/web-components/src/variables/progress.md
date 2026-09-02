[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / progress

# Variabel: progress

> `const` **progress**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-progress&gt;` — en vandret indikator understøttet af oprindelig `&lt;progress&gt;` eller `&lt;meter&gt;` semantik.

`value-now`/`value` styrer `--value`, mens `min` og `value-max`/`max` styrer området. Et nul-minimum gengiver et oprindeligt `&lt;progress&gt;`; et ikke-nul-minimum gengiver `&lt;meter&gt;`. Tilføj det booleske `should-animate` attribut for at overgange målermændringer over et halvt sekund. `variant` kortlægger komponenten til `-color-&lt;variant&gt;` og `label` giver dens tilgængelighednavn.

## Eksempel

```html
<instui-progress value-now="40" value-max="60" variant="success" should-animate></instui-progress>
```
