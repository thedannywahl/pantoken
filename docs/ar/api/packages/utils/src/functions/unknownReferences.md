[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / unknownReferences

# دالة: unknownReferences()

> **unknownReferences**(`text`, `ir`): `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

فحص الانحراف: أسماء `--instui-*` في `text` التي لا يعرفها الـ IR (مرتبة؛ الفراغ يعني عدم وجود
انحراف). يُستخدم للمخرجات التي *تشير إلى* توكنات معرفة في مكان آخر — مثال: جسور docusaurus/vitepress
التي يجب أن تكون جميع أهداف `var(--instui-*)` الخاصة بها توكنات فعلية.

## المعلمات

### text

`string`

المخرجات المُولَّدة.

### ir

قابل للقراءة فقط [`Token`](../../../core/src/interfaces/Token.md)[]

نموذج IR للتوكن المصدر.

## القيم المرجعة

`string`[]

أسماء التوكنات المجهولة.

## مثال

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
