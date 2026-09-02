[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / dateInput

# Variable: dateInput

> `const` **dateInput**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

`&lt;instui-date-input&gt;` — un camp de text més un desplegable de calendari. El disparador commuta un `[popover]` a través de l'ordre d'Invocador integrada `toggle-popover` (un retorn de clic cobreix navegadors sense l'API); triar un dia al `&lt;instui-calendar&gt;` imbricat omple el camp (ISO `yyyy-mm-dd`), tanca la finestra emergent i emet un `change` compost i bubbling (`detail.value`). Escriure un `yyyy-mm-dd` vàlid (o esborrar-lo) i confirmar en l'entrada `change` també funciona. `value` és la data ISO, `label` el nom accessible (per defecte `Date`), i `placeholder` la pista (per defecte `yyyy-mm-dd`).

## Exemple

```html
<instui-date-input value="2026-07-08" label="Due date"></instui-date-input>
```
