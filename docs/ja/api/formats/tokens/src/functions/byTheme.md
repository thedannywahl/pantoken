[pantoken](../../../../index.md) / [formats/tokens/src](../index.md) / byTheme

# 関数: byTheme()

> **byTheme**(`theme`): [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Look up a theme's IR by name.

## パラメーター

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## 戻り値

[`Token`](../../../../packages/core/src/interfaces/Token.md)[]

## 例

```ts
import { byTheme } from "@pantoken/tokens";
import { toScss } from "@pantoken/scss";

toScss(byTheme("canvas"), { mode: "dark" });
```
