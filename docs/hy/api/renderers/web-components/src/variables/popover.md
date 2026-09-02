[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / popover

# Փոփոխական: popover

> `const` **popover**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

`&lt;instui-popover&gt;` — լողացող մակերես: Ինչպես `&lt;instui-context-view&gt;`-ը, հյուսքը սկզբնական
`[popover]` է (վերին շերտ + թեթև փակ), այնպես որ թեթև DOM-ի `popovertarget` կոճակը կարող է այն անջատել id-ով:
Բովանդակությունը մտնում է լռելյալ սլոտում:

## Օրինակ

```html
<button popovertarget="menu">Options</button>
<instui-popover id="menu">…</instui-popover>
```
