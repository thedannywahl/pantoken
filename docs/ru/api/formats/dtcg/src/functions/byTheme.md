[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / byTheme

# Функция: byTheme()

> **byTheme**(`theme`): `DtcgDoc`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Look up a theme's DTCG document by name.

## Параметры

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## Возвращаемое значение

`DtcgDoc`

## Пример

```ts
import { byTheme } from "@pantoken/dtcg";

const doc = byTheme("canvasHighContrast");
```
