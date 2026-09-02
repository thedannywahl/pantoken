[pantoken](../../../../index.md) / [formats/tokens/src](../index.md) / byTheme

# Funktion: byTheme()

> **byTheme**(`theme`): [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Look up a theme's IR by name.

## Parametrar

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## Returnerar

[`Token`](../../../../packages/core/src/interfaces/Token.md)[]

## Exempel

```ts
import { byTheme } from "@pantoken/tokens";
import { toScss } from "@pantoken/scss";

toScss(byTheme("canvas"), { mode: "dark" });
```
