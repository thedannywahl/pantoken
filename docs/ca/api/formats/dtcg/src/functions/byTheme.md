[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / byTheme

# Funció: byTheme()

> **byTheme**(`theme`): `DtcgDoc`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Cercar el document DTCG d'un tema pel nom.

## Paràmetres

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## Retorna

`DtcgDoc`

## Exemple

```ts
import { byTheme } from "@pantoken/dtcg";

const doc = byTheme("canvasHighContrast");
```
