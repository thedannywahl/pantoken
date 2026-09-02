[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / byTheme

# Fonction: byTheme()

> **byTheme**(`theme`): `DtcgDoc`

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Look up a theme's DTCG document by name.

## Paramètres

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## Retourne

`DtcgDoc`

## Exemple

```ts
import { byTheme } from "@pantoken/dtcg";

const doc = byTheme("canvasHighContrast");
```
