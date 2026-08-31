[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / drilldown

# Variable: drilldown

> `const` **drilldown**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-drilldown&gt;` — en tilstandsbehørende, multi-niveaumenu over menustilene. Hvert niveau er en lys-DOM
`[data-page="id"]` hvis indre `.item`s klones ind i en skygge `.instui-menu`; et element med
`data-goto="id"` går ned til den side og en syntetiseret Back-række (eller ethvert `[data-back]` element)
vender tilbage. Det klare DOM er kun datakilden — uden `&lt;slot&gt;` bliver det aldrig gengivet, så skygge-CSS
stiler fuldt ud hvert panel. Attributten `active` afspejler den aktuelle side og kan indstilles til
at navigere; en bobbende `navigate` begivenhed (`detail.page`) udløses ved hvert træk. Kan styres fra lys DOM
via Invoker-kommandoer: `<button command="--goto" commandfor="dd-id" data-page="…">` går ned og
`<button command="--back" commandfor="dd-id">` vender tilbage.

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
