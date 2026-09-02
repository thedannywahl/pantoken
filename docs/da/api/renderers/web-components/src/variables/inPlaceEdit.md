[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / inPlaceEdit

# Variabel: inPlaceEdit

> `const` **inPlaceEdit**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-in-place-edit&gt;` — et klik-for-at-redigere-felt. `value` vises som tekst; ved klik/fokus bliver det
redigerbart, Enter eller blur bekræfter (og udløser en bobbende `change` begivenhed med `detail.value`), og
Escape vender tilbage til værdi før redigering. `readonly` deaktiverer redigering. En ekstern `value` ændring
reflekteres ind i feltet mens det ikke bliver redigeret.

## Eksempel

```html
<instui-in-place-edit value="Course title"></instui-in-place-edit>
```
