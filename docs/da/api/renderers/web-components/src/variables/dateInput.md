[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / dateInput

# Variabel: dateInput

> `const` **dateInput**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-date-input&gt;` — et tekstfelt plus en kalenderrullmenu. Triggeren skifter en `[popover]`
igennem den indbyggede `toggle-popover` Invoker-kommando (et klik-fallback dækker browsere uden
API'en); at vælge en dag i det indlejrede `&lt;instui-calendar&gt;` udfylder feltet (ISO `yyyy-mm-dd`), lukker
popoveren og sender en sammensat, bobbende `change` (`detail.value`). At skrive en gyldig `yyyy-mm-dd` (eller
slette den) og bekræfte på inputtets `change` fungerer også. `value` er ISO-datoen, `label` det
tilgængelige navn (standard `Date`), og `placeholder` hintet (standard `yyyy-mm-dd`).

## Eksempel

```html
<instui-date-input value="2026-07-08" label="Due date"></instui-date-input>
```
