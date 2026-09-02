[pantoken](../../../../index.md) / [formats/tokens/src](../index.md) / byTheme

# Swyddogaeth: byTheme()

> **byTheme**(`theme`): [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Look up a theme's IR by name.

## Paramedrau

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## Yn dychwelyd

[`Token`](../../../../packages/core/src/interfaces/Token.md)[]

## Enghraifft

```ts
import { byTheme } from "@pantoken/tokens";
import { toScss } from "@pantoken/scss";

toScss(byTheme("canvas"), { mode: "dark" });
```
