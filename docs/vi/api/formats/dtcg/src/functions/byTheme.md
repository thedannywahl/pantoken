[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / byTheme

# Hàm: byTheme()

> **byTheme**(`theme`): `DtcgDoc`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Look up a theme's DTCG document by name.

## Tham số

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## Trả về

`DtcgDoc`

## Ví dụ

```ts
import { byTheme } from "@pantoken/dtcg";

const doc = byTheme("canvasHighContrast");
```
