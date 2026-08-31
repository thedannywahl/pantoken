[pantoken](../../../../index.md) / [packages/core/src](../index.md) / applyModify

# Function: applyModify()

> **applyModify**(`value`, `modify`): `string` \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

تطبيق Tokens Studio [TokenModify](../interfaces/TokenModify.md) على لون hex محدد.

## Parameters

### value

`string`

### modify

[`TokenModify`](../interfaces/TokenModify.md)

## Returns

`string` \| `undefined`

اللون المُعدل، أو `undefined` عندما يكون `value` ليس لون hex (بحيث يمكن للمتصل الرجوع إلى الحفاظ على المعدّل كبيانات وصفية).

## Examples

**تغميق وتفتيح وإضافة ألفا**

```ts
import { applyModify } from "@pantoken/core";

applyModify("#808080", { type: "darken", value: 0.5 }); // → "#404040"
applyModify("#808080", { type: "lighten", value: 0.5 }); // → "#c0c0c0"
applyModify("#ffffff", { type: "alpha", value: 0.5 }); // → "#ffffff80"
```

**إدخال غير hex ومزج إرجاع غير محدد (الحفاظ على البيانات الوصفية)**

```ts
import { applyModify } from "@pantoken/core";

applyModify("var(--x)", { type: "darken", value: 0.1 }); // → undefined
applyModify("#fff", { type: "mix", value: 0.5, color: "#000" }); // → undefined
```
