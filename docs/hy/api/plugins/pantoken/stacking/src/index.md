[pantoken](../../../../index.md) / stacking

# stacking

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

`@pantoken/plugin-stacking` — անվանված z-index խորություններ:

InstUI-ի `View` բացահայտում է կույտային մասշտաբ (`deepest`, `below`, `above`, `topmost`), որպեսզի շերտերը կույտ լինեն
անկեղծ շեղումից փոխարեն ձեռքով կարգավորված ցուցամոր թվերով: Այս պլագինը արտանետում է `--instui-stacking-&lt;level&gt;`
տոկեներ, լուծված կոնկրետ z-index արժեքներով առաքվածից `--instui-component-view-stacking-*`
տոկեներ, սպառողների համար ստորածին մակարդակի `@pantoken/css`/`@pantoken/tokens` խողովակ ուղղակիորեն օգտագործելիս:
Կամ համապատասխան `.instui-stack-&lt;level&gt;` կոմունալ դասերը այժմ ապրում են `@pantoken/components`-ի իր
`stacking` կոմունալում:

## Օրինակ

```ts
import { buildTokens } from "@pantoken/core";
import { stacking } from "@pantoken/plugin-stacking";

const tokens = buildTokens({ theme: "rebrand", plugins: [stacking()] });
// → includes --instui-stacking-topmost: …
```

## Ինտերֆեյսներ

- [StackingOptions](interfaces/StackingOptions.md)

## Փոփոխականներ

- [STACKING\_LEVELS](variables/STACKING_LEVELS.md)

## Ֆունկցիաներ

- [stacking](functions/stacking.md)

## Հղումներ

### default

Վերանամ և վերաարտահանել [stacking](functions/stacking.md)
