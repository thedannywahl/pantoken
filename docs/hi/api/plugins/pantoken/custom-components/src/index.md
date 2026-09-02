[pantoken](../../../../index.md) / custom-components

# custom-components

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

`@pantoken/plugin-custom-components` — custom components for downstream consumers.

## उदाहरण

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { customComponents } from "@pantoken/plugin-custom-components";

const css = toCss(byTheme("rebrand"), { plugins: [customComponents()] });
// appends all custom-component rules to the token sheet
```

## इंटरफेस

- [CustomComponentsOptions](interfaces/CustomComponentsOptions.md)

## फंक्शन्स

- [bannerRules](functions/bannerRules.md)
- [cardRules](functions/cardRules.md)
- [customComponents](functions/customComponents.md)

## संदर्भ

### default

Renames and re-exports [customComponents](functions/customComponents.md)
