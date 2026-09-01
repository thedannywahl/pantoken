[pantoken](../../../../index.md) / [packages/core/src](../index.md) / defineToken

# دالة: defineToken()

> **defineToken**(`input`): [`Token`](../interfaces/Token.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

بناء [Token](../interfaces/Token.md) مكتمل من مدخل جزئي، مع افتراض القيم الافتراضية لـ `inherits` و `syntax`.

## المعلمات

### input

[`TokenInput`](../interfaces/TokenInput.md)

## القيم المرجعة

[`Token`](../interfaces/Token.md)

## أمثلة

**استنتاج الصياغة من قيمة ملموسة**

```ts
import { defineToken } from "@pantoken/core";

defineToken({ name: "--instui-color-x", value: "#0374B5" });
// → { name: "--instui-color-x", syntax: "<color>", inherits: true, value: "#0374B5" }
```

**قيمة var() واحدة تسجل refersTo؛ و light-dark() تضبط themed**

```ts
import { defineToken } from "@pantoken/core";

defineToken({ name: "--instui-brand", value: "var(--instui-color-background-brand)" });
// → syntax "*", refersTo: "--instui-color-background-brand"

defineToken({ name: "--instui-bg", value: "light-dark(#fff, #000)" });
// → syntax "*", themed: true
```
