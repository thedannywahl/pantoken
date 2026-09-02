[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / byTheme

# Funzione: byTheme()

> **byTheme**(`theme`): `DtcgDoc`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Look up a theme's DTCG document by name.

## Parametri

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## Restituisce

`DtcgDoc`

## Esempio

```ts
import { byTheme } from "@pantoken/dtcg";

const doc = byTheme("canvasHighContrast");
```
