[pantoken](../../../../index.md) / [formats/tokens/src](../index.md) / byTheme

# फंक्शन: byTheme()

> **byTheme**(`theme`): [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Look up a theme's IR by name.

## पैरामीटर

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## वापसी

[`Token`](../../../../packages/core/src/interfaces/Token.md)[]

## उदाहरण

```ts
import { byTheme } from "@pantoken/tokens";
import { toScss } from "@pantoken/scss";

toScss(byTheme("canvas"), { mode: "dark" });
```
