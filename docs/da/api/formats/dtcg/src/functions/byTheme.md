[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / byTheme

# Function: byTheme()

> **byTheme**(`theme`): `DtcgDoc`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Slå et temas DTCG-dokument op efter navn.

## Parameters

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## Returns

`DtcgDoc`

## Example

```ts
import { byTheme } from "@pantoken/dtcg";

const doc = byTheme("canvasHighContrast");
```
