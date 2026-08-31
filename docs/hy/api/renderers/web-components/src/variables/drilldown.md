[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / drilldown

# Variable: drilldown

> `const` **drilldown**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-drilldown&gt;` — վիճակավորված, բազմաստիճանեղ ընտրացանց մենյուի ոճերից վերև։ Յուրաքանչյուր մակարդակ լույսի DOM
`[data-page="id"]`-ն է, որի ներքին `.item`-ները կլոնավորված են ստվերային `.instui-menu`-ի մեջ; տարր
`data-goto="id"`-ով իջնում է այդ էջին և սինթեզացված Back շարագիծ (կամ ցանկացած `[data-back]` տարր)
վերադառնում։ Թեթև DOM-ը տվյալների աղբյուր է միայն — `&lt;slot&gt;`-ի առանց այն երբեք չի գործարկվում, այնպես որ ստվերային CSS-ը
ամբողջական տեղ տալիս է յուրաքանչյուր վահանակին։ `active` հատկանիշը արտացոլում է ընթացիկ էջը և կարող է սահմանվել
նավիգացիայի համար; փուչ `navigate` իրադարձություն (`detail.page`) կրակում է յուրաքանչյուր շարժման համար։ Վարվում է թեթև DOM-ից
Invoker Commands-ի միջոցով. `<button command="--goto" commandfor="dd-id" data-page="…">` իջնում է և
`<button command="--back" commandfor="dd-id">` վերադառնում։

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
