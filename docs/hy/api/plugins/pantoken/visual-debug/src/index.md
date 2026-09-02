[pantoken](../../../../index.md) / visual-debug

# visual-debug

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

`@pantoken/plugin-visual-debug` — InstUI-ի `withVisualDebug` դրույքի համար CSS:

InstUI-ի դասավորության պատկերներ (View, Flex, Grid, List, …) վերցնում են `withVisualDebug` տուփը և դրա երեխաներին ուրվագծել դասավորության վրիպազերծման ընթացքում: Այս խմբակը բացարձակում է մեկ կտրատ-նախածանցված փոփոխիչ,
`-with-visual-debug`, որը աշխատում է ցանկացած տարրի վրա (բաղադրել ցանկացած բազային հետ, օր.
`.instui-view -with-visual-debug`): Ուրվագծայի գույնը `--pantoken-visual-debug-color` հատուկ սեփականություն է
(կանխադրված պայծառ մեջետ) այնպես որ հեշտ է վերաներկել:

## Օրինակ

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { visualDebug } from "@pantoken/plugin-visual-debug";

const css = toCss(byTheme("rebrand"), { plugins: [visualDebug()] });
// <div class="instui-view -with-visual-debug">…</div>
```

## Ինտերֆեյսներ

- [VisualDebugOptions](interfaces/VisualDebugOptions.md)

## Փոփոխականներ

- [VISUAL\_DEBUG\_RULES](variables/VISUAL_DEBUG_RULES.md)

## Ֆունկցիաներ

- [visualDebugRules](functions/visualDebugRules.md)
- [visualDebug](functions/visualDebug.md)

## Հղումներ

### default

Վերանվանում և վերաներմուծում [visualDebug](functions/visualDebug.md)
