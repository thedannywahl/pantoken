[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / tooltip

# Variable: tooltip

> `const` **tooltip**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-tooltip&gt;` — տեղավորված դրդապատճառ փաթաթում և ցույց է տալիս `.tip` փուչիկ (`tip` ատրիբուտից)
նավազի/ֆոկուսի վրա: `placement` քարտեզագրում է `-placement-&lt;value&gt;`-ի (օ.գ. `bottom`, `end`); `show-delay` և
`hide-delay` (ms, լռելյալ 0) դարպասել բացահայտ/թաքց, և Escape այն փակում: JS-ն տեղաշարժել ժամանակ:
միջավ `.-show` `!important` վերականգնում չեղարկում մաքուր CSS `:hover`/`:focus-within` ինքնորեն ցույց
այնպես որ հապաղումը բանականորեն կիրառ:

## Example

```html
<instui-tooltip tip="Placement bottom" placement="bottom" show-delay="200">
  <button class="instui-button -color-secondary">Hover me</button>
</instui-tooltip>
```
