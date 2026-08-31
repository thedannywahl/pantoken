[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / calendar

# Variable: calendar

> `const` **calendar**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-calendar&gt;` — et interaktivt måned-gitter. `value` (`yyyy-mm-dd`) er den valgte dag og
`view` (`yyyy-mm-dd`, valgfrit) den synlige måned. De forrige/næste chevron'er og hver dag er
`&lt;button&gt;`s, der driver Invoker Commands API (`--calendar-prev`, `--calendar-next`,
`--calendar-select`) på gitteret; valg af en dag opdaterer `value`/`view` og afsender en sammensat,
bubblingbegivenhed `change` (`detail.value` er ISO-datoen). Gengiver sit eget gitter (ingen slot), så det
fungerer selvstændigt eller indlejret i en datovælger.

## Example

```html
<instui-calendar value="2026-07-08"></instui-calendar>
```
