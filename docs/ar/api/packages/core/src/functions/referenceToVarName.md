[pantoken](../../../../index.md) / [packages/core/src](../index.md) / referenceToVarName

# Function: referenceToVarName()

> **referenceToVarName**(`reference`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

خريطة نص مرجع Tokens Studio (النص داخل `{…}`) إلى اسم الخاصية المخصصة CSS
للتوكن الذي يشير إليه. قيادة `semantic.` تميز طبقة دلالية من البدائيات.

## Parameters

### reference

`string`

## Returns

`string`

## Example

```ts
import { referenceToVarName } from "@pantoken/core";

referenceToVarName("color.white"); // → "--instui-primitive-color-white"
referenceToVarName("semantic.color.background.base"); // → "--instui-color-background-base"
```
