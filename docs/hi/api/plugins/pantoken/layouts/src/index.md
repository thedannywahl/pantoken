[pantoken](../../../../index.md) / layouts

# layouts

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

`@pantoken/plugin-layouts` — layout composition records for downstream consumers.

## उदाहरण

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { layouts } from "@pantoken/plugin-layouts";

const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
// appends all layout rules to the token sheet
```

## इंटरफेस

- [LayoutsOptions](interfaces/LayoutsOptions.md)
- [PageLayout](interfaces/PageLayout.md)

## वैरिएबल्स

- [pageLayouts](variables/pageLayouts.md)

## फंक्शन्स

- [layouts](functions/layouts.md)
- [wrapperRules](functions/wrapperRules.md)
