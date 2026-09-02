[pantoken](../../../../index.md) / [packages/core/src](../index.md) / applyModify

# دالة: applyModify()

> **applyModify**(`value`, `modify`): `string` \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

تطبيق Tokens Studio [TokenModify](../interfaces/TokenModify.md) على لون سداسي محدد.

## المعلمات

### value

`string`

### modify

[`TokenModify`](../interfaces/TokenModify.md)

## القيم المرجعة

`string` \| `undefined`

اللون المعدّل، أو `undefined` عندما لا يكون `value` لونًا سداسيًا (حتى يتمكن المستدعي من الرجوع للحفاظ على المُعدّل كبيانات وصفية).

## أمثلة

**تغميق، تفتيح، وإضافة ألفا**

```ts
import { applyModify } from "@pantoken/core";

applyModify("#808080", { type: "darken", value: 0.5 });  // → "#404040"
applyModify("#808080", { type: "lighten", value: 0.5 }); // → "#c0c0c0"
applyModify("#ffffff", { type: "alpha", value: 0.5 });   // → "#ffffff80"
```

**الإدخال غير السداسي والخلط يُعيدان undefined (احفظ كبيانات وصفية)**

```ts
import { applyModify } from "@pantoken/core";

applyModify("var(--x)", { type: "darken", value: 0.1 });        // → undefined
applyModify("#fff", { type: "mix", value: 0.5, color: "#000" }); // → undefined
```
