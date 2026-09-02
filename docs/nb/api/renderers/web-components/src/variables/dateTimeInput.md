[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / dateTimeInput

# Variabel: dateTimeInput

> `const` **dateTimeInput**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

`&lt;instui-date-time-input&gt;` — a nested `&lt;instui-date-input&gt;` plus a native time field. A change to
either recomputes a combined `value` (`yyyy-mm-ddThh:mm`, or just the date when no time) and emits
a composed, bubbling `change` (`detail.value`). Setting `value` splits it back across the two
fields.

## Eksempel

```html
<instui-date-time-input value="2026-07-08T14:30"></instui-date-time-input>
```
