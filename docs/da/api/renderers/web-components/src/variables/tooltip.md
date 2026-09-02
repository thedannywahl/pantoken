[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / tooltip

# Variabel: tooltip

> `const` **tooltip**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-tooltip&gt;` — pakker en slottet trigger og viser en `.tip` boble (fra attributten `tip`) ved mouseover/fokus. `placement` kortlægges til `-placement-&lt;value&gt;` (f.eks. `bottom`, `end`); `show-delay` og `hide-delay` (ms, standard 0) kontrollerer afsløringen/skjulingen, og Escape afviser det. JS ejer timingen: en `.-show`-kontrolleret `!important` tilsidesættelse neutraliserer den rene CSS `:hover`/`:focus-within` auto-show, så forsinkelsen rent faktisk gælder.

## Eksempel

```html
<instui-tooltip tip="Placement bottom" placement="bottom" show-delay="200">
  <button class="instui-button -color-secondary">Hover me</button>
</instui-tooltip>
```
