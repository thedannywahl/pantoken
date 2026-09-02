[pantoken](../../../../index.md) / layouts

# layouts

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

`@pantoken/plugin-layouts` — layout composition records for downstream consumers.

## ตัวอย่าง

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { layouts } from "@pantoken/plugin-layouts";

const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
// appends all layout rules to the token sheet
```

## อินเทอร์เฟซ

- [LayoutsOptions](interfaces/LayoutsOptions.md)
- [PageLayout](interfaces/PageLayout.md)

## ตัวแปร

- [pageLayouts](variables/pageLayouts.md)

## ฟังก์ชัน

- [layouts](functions/layouts.md)
- [wrapperRules](functions/wrapperRules.md)
