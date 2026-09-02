[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / byTheme

# 函式: byTheme()

> **byTheme**(`theme`): `DtcgDoc`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Look up a theme's DTCG document by name.

## 參數

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## 回傳

`DtcgDoc`

## 範例

```ts
import { byTheme } from "@pantoken/dtcg";

const doc = byTheme("canvasHighContrast");
```
