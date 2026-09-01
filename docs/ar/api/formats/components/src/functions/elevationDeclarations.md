[pantoken](../../../../index.md) / [formats/components/src](../index.md) / elevationDeclarations

# دالة: elevationDeclarations()

> **elevationDeclarations**(): \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

أزواج اسم/قيمة `--instui-elevation-*` (كل واحد منها `box-shadow` متعدد الطبقات). تشير القيم إلى
رموز ألوان ظل الإسقاط المُوضَّوعة حسب السِمَة، لذا تتكيّف مع كل سِمة أينما تم تحميل ورقة الرموز.

## القيم المرجعة

\[`string`, `string`\][]

زوج واحد من `[customProperty, value]` لكل مستوى ولكل اسم مستعار.

## مثال

```ts
import { elevationDeclarations } from "@pantoken/utils";

elevationDeclarations(); // [["--instui-elevation-resting", "…"], ["--instui-elevation-above", "…"], …]
```
