[pantoken](../../../../index.md) / layouts

# layouts

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

`@pantoken/plugin-layouts` — layout composition records for downstream consumers.

## 範例

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { layouts } from "@pantoken/plugin-layouts";

const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
// appends all layout rules to the token sheet
```

## 介面

- [LayoutsOptions](interfaces/LayoutsOptions.md)
- [PageLayout](interfaces/PageLayout.md)

## 變數

- [pageLayouts](variables/pageLayouts.md)

## 函式

- [layouts](functions/layouts.md)
- [wrapperRules](functions/wrapperRules.md)
