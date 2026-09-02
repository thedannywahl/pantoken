[pantoken](../../../../index.md) / custom-components

# custom-components

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

`@pantoken/plugin-custom-components` — custom components for downstream consumers.

## 範例

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { customComponents } from "@pantoken/plugin-custom-components";

const css = toCss(byTheme("rebrand"), { plugins: [customComponents()] });
// appends all custom-component rules to the token sheet
```

## 介面

- [CustomComponentsOptions](interfaces/CustomComponentsOptions.md)

## 函式

- [bannerRules](functions/bannerRules.md)
- [cardRules](functions/cardRules.md)
- [customComponents](functions/customComponents.md)

## 參考

### default

Renames and re-exports [customComponents](functions/customComponents.md)
