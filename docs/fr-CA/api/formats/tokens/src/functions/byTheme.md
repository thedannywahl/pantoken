[pantoken](../../../../index.md) / [formats/tokens/src](../index.md) / byTheme

# Fonction: byTheme()

> **byTheme**(`theme`): [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Look up a theme's IR by name.

## Paramètres

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## Retourne

[`Token`](../../../../packages/core/src/interfaces/Token.md)[]

## Exemple

```ts
import { byTheme } from "@pantoken/tokens";
import { toScss } from "@pantoken/scss";

toScss(byTheme("canvas"), { mode: "dark" });
```
