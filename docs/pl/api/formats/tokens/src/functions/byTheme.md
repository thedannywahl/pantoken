[pantoken](../../../../index.md) / [formats/tokens/src](../index.md) / byTheme

# Funkcja: byTheme()

> **byTheme**(`theme`): [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Look up a theme's IR by name.

## Parametry

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## Zwraca

[`Token`](../../../../packages/core/src/interfaces/Token.md)[]

## Przykład

```ts
import { byTheme } from "@pantoken/tokens";
import { toScss } from "@pantoken/scss";

toScss(byTheme("canvas"), { mode: "dark" });
```
