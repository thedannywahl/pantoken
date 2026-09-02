[pantoken](../../../../index.md) / [formats/tokens/src](../index.md) / byTheme

# 函式: byTheme()

> **byTheme**(`theme`): [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Look up a theme's IR by name.

## 參數

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## 回傳

[`Token`](../../../../packages/core/src/interfaces/Token.md)[]

## 範例

```ts
import { byTheme } from "@pantoken/tokens";
import { toScss } from "@pantoken/scss";

toScss(byTheme("canvas"), { mode: "dark" });
```
