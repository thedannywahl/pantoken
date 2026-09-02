[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / byTheme

# Fungsi: byTheme()

> **byTheme**(`theme`): `DtcgDoc`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Look up a theme's DTCG document by name.

## Parameter

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## Mengembalikan

`DtcgDoc`

## Contoh

```ts
import { byTheme } from "@pantoken/dtcg";

const doc = byTheme("canvasHighContrast");
```
