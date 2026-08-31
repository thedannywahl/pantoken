[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / drilldown

# Variable: drilldown

> `const` **drilldown**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-drilldown&gt;` — un menú multinivell amb estat sobre els estils del menú. Cada nivell és un `[data-page="id"]` de DOM lleuger els `.item`s interns es clonan en un `.instui-menu` de shadow; un element amb `data-goto="id"` descendeix a aquesta pàgina i una fila Back sintetitzada (o qualsevol element `[data-back]`) retorna. El DOM lleuger és només la font de dades — sense `&lt;slot&gt;` mai es representa, així que CSS shadow estila completament cada panell. L'atribut `active` reflecteix la pàgina actual i es pot establir per navegar; un event bubbling `navigate` (`detail.page`) es dispara a cada moviment. Controlable des del DOM lleuger mitjançant ordres d'Invocador: `<button command="--goto" commandfor="dd-id" data-page="…">` descendeix i `<button command="--back" commandfor="dd-id">` retorna.

## Example

```html
<instui-drilldown active="root">
  <div data-page="root">
    <div class="item" data-goto="settings">Settings</div>
  </div>
  <div data-page="settings">
    <div class="item">Profile</div>
  </div>
</instui-drilldown>
```
