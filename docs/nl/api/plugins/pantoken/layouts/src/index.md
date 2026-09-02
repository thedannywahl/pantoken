[pantoken](../../../../index.md) / layouts

# layouts

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

`@pantoken/plugin-layouts` — layout composition records for downstream consumers.

## Voorbeeld

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { layouts } from "@pantoken/plugin-layouts";

const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
// appends all layout rules to the token sheet
```

## Interfaces

- [LayoutsOptions](interfaces/LayoutsOptions.md)
- [PageLayout](interfaces/PageLayout.md)

## Variabelen

- [pageLayouts](variables/pageLayouts.md)

## Functies

- [layouts](functions/layouts.md)
- [wrapperRules](functions/wrapperRules.md)
