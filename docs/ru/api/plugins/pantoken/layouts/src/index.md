[pantoken](../../../../index.md) / layouts

# layouts

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

`@pantoken/plugin-layouts` — layout composition records for downstream consumers.

## Пример

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { layouts } from "@pantoken/plugin-layouts";

const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
// appends all layout rules to the token sheet
```

## Интерфейсы

- [LayoutsOptions](interfaces/LayoutsOptions.md)
- [PageLayout](interfaces/PageLayout.md)

## Переменные

- [pageLayouts](variables/pageLayouts.md)

## Функции

- [layouts](functions/layouts.md)
- [wrapperRules](functions/wrapperRules.md)
