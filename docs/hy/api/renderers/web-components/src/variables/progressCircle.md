[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / progressCircle

# Փոփոխական: progressCircle

> `const` **progressCircle**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

`&lt;instui-progress-circle&gt;` — շրջանաձև ցուցիչ, որը աջակցված է սկզբնական `&lt;progress&gt;` կամ `&lt;meter&gt;` դերանալություններով:

`value-now`/`value` վարում են `--value`-ը, մինչդեռ `min` և `value-max`/`max` վարում են տիրույթը: Զրոյական նվազագույն արտացոլում է սկզբնական `&lt;progress&gt;`; ոչ զրոյական նվազագույն արտացոլում է `&lt;meter&gt;`: Ավելացրեք բուլյան
`should-animate` ատրիբուտ բույն շարժել չափում վրա; `animation-delay` միլիվայրկյան հապաղում:
`label` վերականգնում է մատչելի անունը (որը հակառակ դեպքում լռելյայնորեն տոկոսն է):

## Օրինակ

```html
<instui-progress-circle value-now="40" value-max="60" should-animate></instui-progress-circle>
```
