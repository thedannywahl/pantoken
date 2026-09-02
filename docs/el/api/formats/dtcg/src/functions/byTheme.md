[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / byTheme

# Συνάρτηση: byTheme()

> **byTheme**(`theme`): `DtcgDoc`

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Look up a theme's DTCG document by name.

## Παράμετροι

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## Επιστρέφει

`DtcgDoc`

## Παράδειγμα

```ts
import { byTheme } from "@pantoken/dtcg";

const doc = byTheme("canvasHighContrast");
```
