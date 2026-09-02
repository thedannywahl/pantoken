[pantoken](../../../../index.md) / [formats/tokens/src](../index.md) / byTheme

# Funktion: byTheme()

> **byTheme**(`theme`): [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Slå et temas IR op efter navn.

## Parametre

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## Returnerer

[`Token`](../../../../packages/core/src/interfaces/Token.md)[]

## Eksempel

```ts
import { byTheme } from "@pantoken/tokens";
import { toScss } from "@pantoken/scss";

toScss(byTheme("canvas"), { mode: "dark" });
```
