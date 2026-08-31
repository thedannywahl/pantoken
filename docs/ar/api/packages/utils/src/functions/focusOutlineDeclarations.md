[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / focusOutlineDeclarations

# Function: focusOutlineDeclarations()

> **focusOutlineDeclarations**(): \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

أزواج الاسم/القيمة `--instui-focus-outline-*` التي تقرأها قواعد الحلقة. يشير اللون/العرض/الإزاحة إلى
رموز التركيز المشتركة المنسوجة بالموضوع؛ الانتقال وأسلوب الخط والإدراج ثوابت.

## Returns

\[`string`, `string`\][]

زوج `[customProperty, value]` واحد لكل متغير حلقة التركيز.

## Example

```ts
import { focusOutlineDeclarations } from "@pantoken/utils";

focusOutlineDeclarations(); // [["--instui-focus-outline-color", "…"], …]
```
