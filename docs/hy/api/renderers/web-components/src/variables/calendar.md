[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / calendar

# Փոփոխական: calendar

> `const` **calendar**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

`&lt;instui-calendar&gt;` — ինտերակտիվ ամսական ցանց: `value` (`yyyy-mm-dd`) ընտրված օրն է և `view` (`yyyy-mm-dd`, ընտրովի) տեսանելի ամիսը: Նախորդ/հաջորդ շեղանկյուններ և յուրաքանչյուր օր `&lt;button&gt;`-ներ են վարում Invoker Commands API-ը (`--calendar-prev`, `--calendar-next`, `--calendar-select`) ցանցում; օրի ընտրությունը թարմացնում է `value`/`view` և ուղարկում է կազմված, պղպջակ `change` իրադարձություն (`detail.value` ISO ամսաթիվն է): Ցուցադրում է իր ապատիճանի ցանց (ոչ բաղադրիչ), ուստի այն գործում է ինքնուրույն կամ ներված ամսաթվի ընտրիչի ներսում:

## Օրինակ

```html
<instui-calendar value="2026-07-08"></instui-calendar>
```
