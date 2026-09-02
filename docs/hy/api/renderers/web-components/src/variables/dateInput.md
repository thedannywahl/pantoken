[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / dateInput

# Փոփոխական: dateInput

> `const` **dateInput**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

`&lt;instui-date-input&gt;` — տեքստային դաշտ և օրացույցի բացվածք։ Ձգիչը միացնում է `[popover]`
ներկառուցված `toggle-popover` Invoker Command-ի միջոցով (սեղմման ընկնելը շրջապատում է բրաուզերներին առանց
API-ի); ամսաթվի ընտրումը ներդրված `&lt;instui-calendar&gt;`-ից լրացնում է դաշտը (ISO `yyyy-mm-dd`), փակում է
popover-ը և արտանետում է կազմված, փուչ `change` (`detail.value`)։ Վավեր `yyyy-mm-dd` մուտքագրումը (կամ
այն հեռացնելը) և մուտքի `change`-ում հաստատումը նույնպես աշխատում են։ `value`-ը ISO ամսաթիվն է, `label`-ը՝
մատչելի անվանումը (կանխադրված `Date`), և `placeholder`-ը՝ հուշումը (կանխադրված `yyyy-mm-dd`)։

## Օրինակ

```html
<instui-date-input value="2026-07-08" label="Due date"></instui-date-input>
```
