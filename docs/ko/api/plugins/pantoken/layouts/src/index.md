[pantoken](../../../../index.md) / layouts

# layouts

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

`@pantoken/plugin-layouts` — layout composition records for downstream consumers.

## 예제

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { layouts } from "@pantoken/plugin-layouts";

const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
// appends all layout rules to the token sheet
```

## 인터페이스

- [LayoutsOptions](interfaces/LayoutsOptions.md)
- [PageLayout](interfaces/PageLayout.md)

## 변수

- [pageLayouts](variables/pageLayouts.md)

## 함수

- [layouts](functions/layouts.md)
- [wrapperRules](functions/wrapperRules.md)
