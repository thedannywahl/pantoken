[pantoken](../../../../index.md) / custom-components

# custom-components

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-custom-components` — components personalitzats per a consumidors de flux descendent.

## Exemple

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { customComponents } from "@pantoken/plugin-custom-components";

const css = toCss(byTheme("rebrand"), { plugins: [customComponents()] });
// appends all custom-component rules to the token sheet
```

## Interfícies

- [CustomComponentsOptions](interfaces/CustomComponentsOptions.md)

## Funcions

- [bannerRules](functions/bannerRules.md)
- [cardRules](functions/cardRules.md)
- [customComponents](functions/customComponents.md)

## Referències

### default

Reanomena i reexporta [customComponents](functions/customComponents.md)
