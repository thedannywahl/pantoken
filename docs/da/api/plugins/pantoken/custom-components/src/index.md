[pantoken](../../../../index.md) / custom-components

# custom-components

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-custom-components` — brugerdefinerede komponenter til downstream-forbrugere.

## Eksempel

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { customComponents } from "@pantoken/plugin-custom-components";

const css = toCss(byTheme("rebrand"), { plugins: [customComponents()] });
// appends all custom-component rules to the token sheet
```

## Interfaces

- [CustomComponentsOptions](interfaces/CustomComponentsOptions.md)

## Funktioner

- [bannerRules](functions/bannerRules.md)
- [cardRules](functions/cardRules.md)
- [customComponents](functions/customComponents.md)

## Referencer

### default

Omdøber og re-eksporterer [customComponents](functions/customComponents.md)
