[pantoken](../../../../index.md) / [formats/tokens/src](../index.md) / byTheme

# Функція: byTheme()

> **byTheme**(`theme`): [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Look up a theme's IR by name.

## Параметри

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## Повертає

[`Token`](../../../../packages/core/src/interfaces/Token.md)[]

## Приклад

```ts
import { byTheme } from "@pantoken/tokens";
import { toScss } from "@pantoken/scss";

toScss(byTheme("canvas"), { mode: "dark" });
```
