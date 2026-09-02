[pantoken](../../../../index.md) / [formats/tokens/src](../index.md) / byTheme

# دالة: byTheme()

> **byTheme**(`theme`): [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

استعلام عن IR لسمة حسب الاسم.

## المعلمات

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## القيم المرجعة

[`Token`](../../../../packages/core/src/interfaces/Token.md)[]

## مثال

```ts
import { byTheme } from "@pantoken/tokens";
import { toScss } from "@pantoken/scss";

toScss(byTheme("canvas"), { mode: "dark" });
```
