[pantoken](../../../../index.md) / [formats/tokens/src](../index.md) / byTheme

# Función: byTheme()

> **byTheme**(`theme`): [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Look up a theme's IR by name.

## Parámetros

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## Devuelve

[`Token`](../../../../packages/core/src/interfaces/Token.md)[]

## Ejemplo

```ts
import { byTheme } from "@pantoken/tokens";
import { toScss } from "@pantoken/scss";

toScss(byTheme("canvas"), { mode: "dark" });
```
