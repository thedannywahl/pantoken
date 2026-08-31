[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / inPlaceEdit

# Variable: inPlaceEdit

> `const` **inPlaceEdit**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-in-place-edit&gt;` — սեղմել-խմբագրել դաշտ։ `value` ցուցադրվում է տեքստ; սեղմումից/կենտրոնացումից այն դառնում է
խմբագրելի, Enter կամ blur-ը պարտավորեցնում է (և կրակում է փուչ `change` իրադարձություն `detail.value`-ով), և
Escape-ը վերադառնում է պրե-խմբագրել արժեքին։ `readonly`-ը անջատում է խմբագրումը։ Արտաքին `value` փոփոխությունը
արտացոլվում է դաշտի մեջ, մինչ այն խմբագրվում չէ։

## Example

```html
<instui-in-place-edit value="Course title"></instui-in-place-edit>
```
