[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / logosPlugin

# Ֆունկցիա: logosPlugin()

> **logosPlugin**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Ստեղծել լոգոներ բնակիչ:

`css` կոկոր նպաստում է `--instui-logo-*` պատկեր տոկեններին (որպես `url(data:…)` արժեքներ), այնպես որ բամբակ կառուցված բնակիչով կարող է հղել ցանկացած լոգո `var()` միջոցով:

## Պարամետրեր

### options?

[`LogosOptions`](../interfaces/LogosOptions.md) = `{}`

[LogosOptions](../interfaces/LogosOptions.md).

## Վերադարձվող արժեք

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

[PantokenPlugin](../../../../../packages/core/src/interfaces/PantokenPlugin.md) `css` կեռիկով։

## Օրինակ

**Ավելացնել լոգո պատկեր տոկեններ CSS միասեռ մեջ toCss-ի միջոցով**

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { logosPlugin } from "@pantoken/plugin-logos";

const css = toCss(byTheme("rebrand"), { plugins: [logosPlugin()] });
// then in CSS: background-image: var(--instui-logo-instructure-horizontal-full-color);
```
