[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / calendar

# Variable: calendar

> `const` **calendar**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`<instui-calendar>` — an interactive month grid. `value` (`yyyy-mm-dd`) is the selected day and
`view` (`yyyy-mm-dd`, optional) the visible month. The prev/next chevrons and every day are
`<button>`s driving the Invoker Commands API (`--calendar-prev`, `--calendar-next`,
`--calendar-select`) at the grid; selecting a day updates `value`/`view` and dispatches a composed,
bubbling `change` event (`detail.value` is the ISO date). Renders its own grid (no slot), so it
works standalone or nested inside a date picker.

## Example

```html
<instui-calendar value="2026-07-08"></instui-calendar>
```
