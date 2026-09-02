[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / byTheme

# Функція: byTheme()

> **byTheme**(`theme`): `DtcgDoc`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Look up a theme's DTCG document by name.

## Параметри

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## Повертає

`DtcgDoc`

## Приклад

```ts
import { byTheme } from "@pantoken/dtcg";

const doc = byTheme("canvasHighContrast");
```
