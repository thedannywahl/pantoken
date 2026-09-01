[pantoken](../../../../index.md) / custom-components

# custom-components

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

`@pantoken/plugin-custom-components` — مكونات مخصصة للمستهلكين اللاحقين.

## مثال

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { customComponents } from "@pantoken/plugin-custom-components";

const css = toCss(byTheme("rebrand"), { plugins: [customComponents()] });
// appends all custom-component rules to the token sheet
```

## واجهات

- [CustomComponentsOptions](interfaces/CustomComponentsOptions.md)

## الدوال

- [bannerRules](functions/bannerRules.md)
- [cardRules](functions/cardRules.md)
- [customComponents](functions/customComponents.md)

## المراجع

### default

يعيد تسمية ويعيد تصدير [customComponents](functions/customComponents.md)
