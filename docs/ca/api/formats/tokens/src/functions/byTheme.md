[pantoken](../../../../index.md) / [formats/tokens/src](../index.md) / byTheme

# Funció: byTheme()

> **byTheme**(`theme`): [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Buscar el IR d'un tema per nom.

## Paràmetres

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## Retorna

[`Token`](../../../../packages/core/src/interfaces/Token.md)[]

## Exemple

```ts
import { byTheme } from "@pantoken/tokens";
import { toScss } from "@pantoken/scss";

toScss(byTheme("canvas"), { mode: "dark" });
```
