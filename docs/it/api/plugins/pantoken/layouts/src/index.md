[pantoken](../../../../index.md) / layouts

# layouts

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-layouts` — layout composition records for downstream consumers.

## Esempio

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { layouts } from "@pantoken/plugin-layouts";

const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
// appends all layout rules to the token sheet
```

## Interfacce

- [LayoutsOptions](interfaces/LayoutsOptions.md)
- [PageLayout](interfaces/PageLayout.md)

## Variabili

- [pageLayouts](variables/pageLayouts.md)

## Funzioni

- [layouts](functions/layouts.md)
- [wrapperRules](functions/wrapperRules.md)
