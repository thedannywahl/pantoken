[pantoken](../../../../index.md) / layouts

# layouts

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

`@pantoken/plugin-layouts` — layout composition records for downstream consumers.

## Παράδειγμα

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { layouts } from "@pantoken/plugin-layouts";

const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
// appends all layout rules to the token sheet
```

## Διεπαφές

- [LayoutsOptions](interfaces/LayoutsOptions.md)
- [PageLayout](interfaces/PageLayout.md)

## Μεταβλητές

- [pageLayouts](variables/pageLayouts.md)

## Συναρτήσεις

- [layouts](functions/layouts.md)
- [wrapperRules](functions/wrapperRules.md)
