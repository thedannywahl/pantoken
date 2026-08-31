[pantoken](../../../../index.md) / [formats/components/src](../index.md) / elevationDeclarations

# Function: elevationDeclarations()

> **elevationDeclarations**(): \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

أزواج الاسم/القيمة `--instui-elevation-*` (كل منها `box-shadow` متعدد الطبقات). تشير القيم إلى
رموز لون الظل المنسوجة بالموضوع، لذا تتكيف حسب الموضوع أينما تحمل ورقة رموز.

## Returns

\[`string`, `string`\][]

زوج `[customProperty, value]` واحد لكل مستوى واسم مستعار.

## Example

```ts
import { elevationDeclarations } from "@pantoken/utils";

elevationDeclarations(); // [["--instui-elevation-resting", "…"], ["--instui-elevation-above", "…"], …]
```
