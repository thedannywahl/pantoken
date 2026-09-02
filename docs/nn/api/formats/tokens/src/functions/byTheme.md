[pantoken](../../../../index.md) / [formats/tokens/src](../index.md) / byTheme

# Funksjon: byTheme()

> **byTheme**(`theme`): [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Look up a theme's IR by name.

## Parametrar

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## Returnerer

[`Token`](../../../../packages/core/src/interfaces/Token.md)[]

## Døme

```ts
import { byTheme } from "@pantoken/tokens";
import { toScss } from "@pantoken/scss";

toScss(byTheme("canvas"), { mode: "dark" });
```
