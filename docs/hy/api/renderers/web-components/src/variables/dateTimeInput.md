[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / dateTimeInput

# Փոփոխական: dateTimeInput

> `const` **dateTimeInput**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

`&lt;instui-date-time-input&gt;` — ներդրված `&lt;instui-date-input&gt;` գումարած բնիկ ժամանակի դաշտ։ Որևէ մեկի փոփոխությունը
վերահաշվում է համակցված `value` (`yyyy-mm-ddThh:mm`, կամ միայն ամսաթիվ, երբ ժամանակ չկա) և արտանետում է
կազմված, փուչ `change` (`detail.value`)։ `value`-ի սահմանումը այն բաժանում է հետ երկու
դաշտերում։

## Օրինակ

```html
<instui-date-time-input value="2026-07-08T14:30"></instui-date-time-input>
```
