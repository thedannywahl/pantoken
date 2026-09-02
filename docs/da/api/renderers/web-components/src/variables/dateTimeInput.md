[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / dateTimeInput

# Variabel: dateTimeInput

> `const` **dateTimeInput**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-date-time-input&gt;` — et indlejret `&lt;instui-date-input&gt;` plus et indfødt tidsfelt. En ændring af
enten genberegner en kombineret `value` (`yyyy-mm-ddThh:mm`, eller blot datoen når der ikke er tid) og sender
en sammensat, bobbende `change` (`detail.value`). Indstilling af `value` deler det tilbage over de to
felter.

## Eksempel

```html
<instui-date-time-input value="2026-07-08T14:30"></instui-date-time-input>
```
