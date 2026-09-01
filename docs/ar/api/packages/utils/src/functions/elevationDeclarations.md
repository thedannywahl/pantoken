[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / elevationDeclarations

# دالة: elevationDeclarations()

> **elevationDeclarations**(): \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

أزواج الاسم/القيمة `--instui-elevation-*` (كل منها `box-shadow` متعدد الطبقات). تشير القيم إلى
رموز ألوان ظل الإسقاط ذات السمات، لذا فهي تتكيف حسب السمة أينما تم تحميل ورقة الرموز.

## القيم المرجعة

\[`string`, `string`\][]

زوج واحد `[customProperty, value]` لكل مستوى ولكل اسم مستعار.

## مثال

```ts
import { elevationDeclarations } from "@pantoken/utils";

elevationDeclarations(); // [["--instui-elevation-resting", "…"], ["--instui-elevation-above", "…"], …]
```
