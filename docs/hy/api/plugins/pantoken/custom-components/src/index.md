[pantoken](../../../../index.md) / custom-components

# custom-components

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

`@pantoken/plugin-custom-components` — վաճախորդական բաղադրիչներ հետստորման սպառողների համար։

## Օրինակ

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { customComponents } from "@pantoken/plugin-custom-components";

const css = toCss(byTheme("rebrand"), { plugins: [customComponents()] });
// appends all custom-component rules to the token sheet
```

## Ինտերֆեյսներ

- [CustomComponentsOptions](interfaces/CustomComponentsOptions.md)

## Ֆունկցիաներ

- [bannerRules](functions/bannerRules.md)
- [cardRules](functions/cardRules.md)
- [customComponents](functions/customComponents.md)

## Հղումներ

### default

Վերանվանում և վերաարտահանում է [customComponents](functions/customComponents.md)
