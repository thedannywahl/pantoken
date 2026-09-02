[pantoken](../../../../index.md) / layouts

# layouts

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

`@pantoken/plugin-layouts` — դասավորման բաղադրություն գրառումներ ներքևի սպառողների համար:

## Օրինակ

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { layouts } from "@pantoken/plugin-layouts";

const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
// appends all layout rules to the token sheet
```

## Ինտերֆեյսներ

- [LayoutsOptions](interfaces/LayoutsOptions.md)
- [PageLayout](interfaces/PageLayout.md)

## Փոփոխականներ

- [pageLayouts](variables/pageLayouts.md)

## Ֆունկցիաներ

- [layouts](functions/layouts.md)
- [wrapperRules](functions/wrapperRules.md)
