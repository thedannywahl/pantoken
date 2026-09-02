[pantoken](../../../../index.md) / [packages/core/src](../index.md) / referenceToVarName

# دالة: referenceToVarName()

> **referenceToVarName**(`reference`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

قم بتعيين نص مرجع Tokens Studio (النص داخل `{…}`) إلى اسم الخاصية المخصصة في CSS للرمز الذي يُشير إليه.
البادئة `semantic.` تميّز الطبقة الدلالية عن البدائيات.

## المعلمات

### reference

`string`

## القيم المرجعة

`string`

## مثال

```ts
import { referenceToVarName } from "@pantoken/core";

referenceToVarName("color.white");                  // → "--instui-primitive-color-white"
referenceToVarName("semantic.color.background.base"); // → "--instui-color-background-base"
```
