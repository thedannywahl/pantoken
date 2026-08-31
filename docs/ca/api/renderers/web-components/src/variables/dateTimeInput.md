[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / dateTimeInput

# Variable: dateTimeInput

> `const` **dateTimeInput**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-date-time-input&gt;` — un `&lt;instui-date-input&gt;` imbricat més un camp de temps natiu. Un canvi en qualsevol dels dos recomputa un `value` combinat (`yyyy-mm-ddThh:mm`, o només la data quan no hi ha hora) i emet un `change` compost i bubbling (`detail.value`). Establir `value` ho divideix de nou als dos camps.

## Example

```html
<instui-date-time-input value="2026-07-08T14:30"></instui-date-time-input>
```
