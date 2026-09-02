[pantoken](../../../../index.md) / [formats/tokens/src](../index.md) / byTheme

# Functie: byTheme()

> **byTheme**(`theme`): [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

Look up a theme's IR by name.

## Parameters

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## Retourneert

[`Token`](../../../../packages/core/src/interfaces/Token.md)[]

## Voorbeeld

```ts
import { byTheme } from "@pantoken/tokens";
import { toScss } from "@pantoken/scss";

toScss(byTheme("canvas"), { mode: "dark" });
```
