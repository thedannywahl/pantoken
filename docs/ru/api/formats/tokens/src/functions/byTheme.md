[pantoken](../../../../index.md) / [formats/tokens/src](../index.md) / byTheme

# Функция: byTheme()

> **byTheme**(`theme`): [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Look up a theme's IR by name.

## Параметры

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## Возвращаемое значение

[`Token`](../../../../packages/core/src/interfaces/Token.md)[]

## Пример

```ts
import { byTheme } from "@pantoken/tokens";
import { toScss } from "@pantoken/scss";

toScss(byTheme("canvas"), { mode: "dark" });
```
