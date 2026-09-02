[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / byTheme

# फंक्शन: byTheme()

> **byTheme**(`theme`): `DtcgDoc`

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Look up a theme's DTCG document by name.

## पैरामीटर

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## वापसी

`DtcgDoc`

## उदाहरण

```ts
import { byTheme } from "@pantoken/dtcg";

const doc = byTheme("canvasHighContrast");
```
