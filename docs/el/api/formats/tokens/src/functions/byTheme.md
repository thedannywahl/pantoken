[pantoken](../../../../index.md) / [formats/tokens/src](../index.md) / byTheme

# Συνάρτηση: byTheme()

> **byTheme**(`theme`): [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Look up a theme's IR by name.

## Παράμετροι

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## Επιστρέφει

[`Token`](../../../../packages/core/src/interfaces/Token.md)[]

## Παράδειγμα

```ts
import { byTheme } from "@pantoken/tokens";
import { toScss } from "@pantoken/scss";

toScss(byTheme("canvas"), { mode: "dark" });
```
