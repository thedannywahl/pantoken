[pantoken](../../../../index.md) / [formats/tokens/src](../index.md) / byTheme

# 함수: byTheme()

> **byTheme**(`theme`): [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Look up a theme's IR by name.

## 매개변수

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## 반환값

[`Token`](../../../../packages/core/src/interfaces/Token.md)[]

## 예제

```ts
import { byTheme } from "@pantoken/tokens";
import { toScss } from "@pantoken/scss";

toScss(byTheme("canvas"), { mode: "dark" });
```
