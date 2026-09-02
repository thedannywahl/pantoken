[pantoken](../../../../index.md) / [formats/tokens/src](../index.md) / byTheme

# פונקציה: byTheme()

> **byTheme**(`theme`): [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">בטא</span>

Look up a theme's IR by name.

## פרמטרים

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## מחזיר

[`Token`](../../../../packages/core/src/interfaces/Token.md)[]

## דוגמה

```ts
import { byTheme } from "@pantoken/tokens";
import { toScss } from "@pantoken/scss";

toScss(byTheme("canvas"), { mode: "dark" });
```
