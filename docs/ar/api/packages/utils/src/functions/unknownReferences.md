[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / unknownReferences

# Function: unknownReferences()

> **unknownReferences**(`text`, `ir`): `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

فحص الانجراف: أسماء `--instui-*` في `text` التي لا تحددها الأشعة تحت الحمراء (مرتبة؛ فارغة تعني عدم وجود انجراف). استخدمها للمخرجات التي _ترجع إلى_ الرموز المحددة في مكان آخر — على سبيل المثال، جسور docusaurus/vitepress، التي يجب أن تكون `var(--instui-*)` الهدف الخاص بها كلها رموز حقيقية.

## Parameters

### text

`string`

المخرجات المُنتجة.

### ir

readonly [`Token`](../../../core/src/interfaces/Token.md)[]

الأشعة تحت الحمراء الرمز المصدر.

## Returns

`string`[]

أسماء الرموز المجهولة.

## Example

```ts
import { unknownReferences } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

const ir: Token[] = [
  { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
];

unknownReferences("--x: var(--instui-leaf); --y: var(--instui-gone);", ir);
// → ["--instui-gone"]
unknownReferences("--x: var(--instui-leaf);", ir); // → []  (no drift)
```
