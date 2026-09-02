[pantoken](../../../../index.md) / [formats/tokens/src](../index.md) / byTheme

# Feidhm: byTheme()

> **byTheme**(`theme`): [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

Look up a theme's IR by name.

## Paraiméadair

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## Tuairisceáin

[`Token`](../../../../packages/core/src/interfaces/Token.md)[]

## Sampla

```ts
import { byTheme } from "@pantoken/tokens";
import { toScss } from "@pantoken/scss";

toScss(byTheme("canvas"), { mode: "dark" });
```
