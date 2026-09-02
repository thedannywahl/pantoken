[pantoken](../../../../index.md) / flatten-property

# flatten-property

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

`@pantoken/plugin-flatten-property` — փոխակերպել `@property` at-կանոնները պարզ հատուկ-սեփականության
հայտարարություններին:

`@property` at-կանոնները գրանցում են մեծատիպ CSS հատուկ հատկությունները `syntax`, `inherits`, և
`initial-value` նկարագրերով: Նրանք կրում են զգալի բայտային վճար — ~60 բայտ կաղապար մեկ
հատկության համար — և անհարկի են, երբ ոճերի թերթը ինքնուրույն փաթեթ է, որտեղ տիպ
գրանցումը ժամանակի օգուտ չի տալիս: Այս խմբակը փոխարինում է յուրաքանչյուր `@property` բլոկը
նկատվածի ներսում պարզ `--name: value` հայտարարությամբ, վերականգնելով այն բոլոր վճարը:

**Իմաստային նկատում.** `@property` հեռացնելը կորցնում է CSS տիպ գրանցումը: Տիպ անցումներ/անիմացիաներ,
`@starting-style`, և CSS Typed OM-ը կախված են դրանից: Միայն կիրառել փաթեթներին, որտեղ այս իմաստաբանություն
անհարկի է:

## Օրինակ

```ts
import postcss from "postcss";
import { flattenProperty } from "@pantoken/plugin-flatten-property";
const out = postcss([flattenProperty()]).process(css, { from: undefined }).css;
```

## Ինտերֆեյսներ

- [FlattenPropertyOptions](interfaces/FlattenPropertyOptions.md)

## Փոփոխականներ

- [flattenProperty](variables/flattenProperty.md)
