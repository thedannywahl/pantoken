[pantoken](../../../../index.md) / custom-components

# custom-components

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

`@pantoken/plugin-custom-components` — custom components for downstream consumers.

## ตัวอย่าง

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { customComponents } from "@pantoken/plugin-custom-components";

const css = toCss(byTheme("rebrand"), { plugins: [customComponents()] });
// appends all custom-component rules to the token sheet
```

## อินเทอร์เฟซ

- [CustomComponentsOptions](interfaces/CustomComponentsOptions.md)

## ฟังก์ชัน

- [bannerRules](functions/bannerRules.md)
- [cardRules](functions/cardRules.md)
- [customComponents](functions/customComponents.md)

## การอ้างอิง

### default

Renames and re-exports [customComponents](functions/customComponents.md)
