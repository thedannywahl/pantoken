[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / calendar

# Variable: calendar

> `const` **calendar**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

`&lt;instui-calendar&gt;` — una graella de mesos interactiva. `value` (`yyyy-mm-dd`) és el dia seleccionat i `view` (`yyyy-mm-dd`, opcional) el mes visible. Els xevrons anterior/següent i cada dia són `&lt;button&gt;`s que impulsen l'API de comandaments d'invocador (`--calendar-prev`, `--calendar-next`, `--calendar-select`) a la graella; seleccionar un dia actualitza `value`/`view` i genera un event compost, bubollant `change` (el `detail.value` és la data ISO). Renderitza la seva pròpia graella (sense slot), de manera que funciona de manera autònoma o imbricada dins d'un selector de data.

## Exemple

```html
<instui-calendar value="2026-07-08"></instui-calendar>
```
