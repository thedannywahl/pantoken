[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / focusOutlineDeclarations

# دالة: focusOutlineDeclarations()

> **focusOutlineDeclarations**(): \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

أزواج الاسم/القيمة `--instui-focus-outline-*` التي تقرأها قواعد الحلقة. اللون/العرض/الإزاحة تشير إلى رموز التركيز المشتركة ذات السمة;
الانتقال، نمط الخط، والإزاحة الداخلية ثوابت.

## القيم المرجعة

\[`string`, `string`\][]

زوج واحد `[customProperty, value]` لكل متغير حلقة التركيز.

## مثال

```ts
import { focusOutlineDeclarations } from "@pantoken/utils";

focusOutlineDeclarations(); // [["--instui-focus-outline-color", "…"], …]
```
