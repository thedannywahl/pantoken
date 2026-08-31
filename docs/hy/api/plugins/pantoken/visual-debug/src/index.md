[pantoken](../../../../index.md) / visual-debug

# visual-debug

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-visual-debug` — InstUI-ի `withVisualDebug` դրույքի համար CSS:

InstUI-ի դասավորության պատկերներ (View, Flex, Grid, List, …) վերցնում են `withVisualDebug` տուփը և դրա երեխաներին ուրվագծել դասավորության վրիպազերծման ընթացքում: Այս խմբակը բացարձակում է մեկ կտրատ-նախածանցված փոփոխիչ,
`-with-visual-debug`, որը աշխատում է ցանկացած տարրի վրա (բաղադրել ցանկացած բազային հետ, օր.
`.instui-view -with-visual-debug`): Ուրվագծայի գույնը `--pantoken-visual-debug-color` հատուկ սեփականություն է
(կանխադրված պայծառ մեջետ) այնպես որ հեշտ է վերաներկել:

## Example

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { visualDebug } from "@pantoken/plugin-visual-debug";

const css = toCss(byTheme("rebrand"), { plugins: [visualDebug()] });
// <div class="instui-view -with-visual-debug">…</div>
```

## Interfaces

- [VisualDebugOptions](interfaces/VisualDebugOptions.md)

## Variables

- [VISUAL\_DEBUG\_RULES](variables/VISUAL_DEBUG_RULES.md)

## Functions

- [visualDebugRules](functions/visualDebugRules.md)
- [visualDebug](functions/visualDebug.md)

## References

### default

Վերանվանում և վերաներմուծում [visualDebug](functions/visualDebug.md)
