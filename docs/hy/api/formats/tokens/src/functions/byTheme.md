[pantoken](../../../../index.md) / [formats/tokens/src](../index.md) / byTheme

# Ֆունկցիա: byTheme()

> **byTheme**(`theme`): [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Որոնել թեմայի IR-ը անունով։

## Պարամետրեր

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## Վերադարձվող արժեք

[`Token`](../../../../packages/core/src/interfaces/Token.md)[]

## Օրինակ

```ts
import { byTheme } from "@pantoken/tokens";
import { toScss } from "@pantoken/scss";

toScss(byTheme("canvas"), { mode: "dark" });
```
