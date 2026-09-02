[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / progress

# Փոփոխական: progress

> `const` **progress**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

`&lt;instui-progress&gt;` — հորիզոնական ցուցիչ, որը աջակցված է սկզբնական `&lt;progress&gt;` կամ `&lt;meter&gt;` դերանալություններով:

`value-now`/`value` վարում են `--value`-ը, մինչդեռ `min` և `value-max`/`max` վարում են տիրույթը: Զրոյական նվազագույն արտացոլում է սկզբնական `&lt;progress&gt;`; ոչ զրոյական նվազագույն արտացոլում է `&lt;meter&gt;`: Ավելացրեք բուլյան
`should-animate` ատրիբուտ տաքսի փոփոխություններ անցկացնել կես վայրկյանի ընթացքում: `variant` քարտեզագրում է
կոմպոնենտը `-color-&lt;variant&gt;`-ի և `label` մատակարարում է դրա մատչելի անունը:

## Օրինակ

```html
<instui-progress value-now="40" value-max="60" variant="success" should-animate></instui-progress>
```
