[pantoken](../../../../index.md) / [formats/components/src](../index.md) / focusOutlineDeclarations

# دالة: focusOutlineDeclarations()

> **focusOutlineDeclarations**(): \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

أزواج الاسم/القيمة `--instui-focus-outline-*` التي تقرأها قواعد الحلقة. يشير اللون/العرض/الإزاحة
إلى الرموز المشتركة للتركيز ذات الطابع؛ الانتقال، نمط الخط، وinset هي ثوابت.

## القيم المرجعة

\[`string`, `string`\][]

زوج واحد من `[customProperty, value]` لكل متغير حلقة التركيز.

## مثال

```ts
import { focusOutlineDeclarations } from "@pantoken/utils";

focusOutlineDeclarations(); // [["--instui-focus-outline-color", "…"], …]
```
