[pantoken](../../../../index.md) / layouts

# layouts

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

`@pantoken/plugin-layouts` — layout composition records for downstream consumers.

## Enghraifft

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { layouts } from "@pantoken/plugin-layouts";

const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
// appends all layout rules to the token sheet
```

## Rhyngwynebau

- [LayoutsOptions](interfaces/LayoutsOptions.md)
- [PageLayout](interfaces/PageLayout.md)

## Newidynnau

- [pageLayouts](variables/pageLayouts.md)

## Swyddogaethau

- [layouts](functions/layouts.md)
- [wrapperRules](functions/wrapperRules.md)
