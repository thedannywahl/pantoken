[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / byTheme

# 関数: byTheme()

> **byTheme**(`theme`): `DtcgDoc`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Look up a theme's DTCG document by name.

## パラメーター

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## 戻り値

`DtcgDoc`

## 例

```ts
import { byTheme } from "@pantoken/dtcg";

const doc = byTheme("canvasHighContrast");
```
