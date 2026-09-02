[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / byTheme

# 函数: byTheme()

> **byTheme**(`theme`): `DtcgDoc`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Look up a theme's DTCG document by name.

## 参数

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## 返回值

`DtcgDoc`

## 示例

```ts
import { byTheme } from "@pantoken/dtcg";

const doc = byTheme("canvasHighContrast");
```
