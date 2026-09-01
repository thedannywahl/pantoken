[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / byTheme

# دالة: byTheme()

> **byTheme**(`theme`): `DtcgDoc`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

ابحث عن مستند DTCG الخاص بالسمة بناءً على الاسم.

## المعلمات

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## القيم المرجعة

`DtcgDoc`

## مثال

```ts
import { byTheme } from "@pantoken/dtcg";

const doc = byTheme("canvasHighContrast");
```
