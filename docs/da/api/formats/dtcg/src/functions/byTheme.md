[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / byTheme

# Funktion: byTheme()

> **byTheme**(`theme`): `DtcgDoc`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Slå et temas DTCG-dokument op efter navn.

## Parametre

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## Returnerer

`DtcgDoc`

## Eksempel

```ts
import { byTheme } from "@pantoken/dtcg";

const doc = byTheme("canvasHighContrast");
```
