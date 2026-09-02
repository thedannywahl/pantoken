[pantoken](../../../../index.md) / layouts

# layouts

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

`@pantoken/plugin-layouts` — سجلات تكوين التخطيط للمستهلكين في المراحل اللاحقة.

## مثال

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { layouts } from "@pantoken/plugin-layouts";

const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
// appends all layout rules to the token sheet
```

## واجهات

- [LayoutsOptions](interfaces/LayoutsOptions.md)
- [PageLayout](interfaces/PageLayout.md)

## المتغيرات

- [pageLayouts](variables/pageLayouts.md)

## الدوال

- [layouts](functions/layouts.md)
- [wrapperRules](functions/wrapperRules.md)
