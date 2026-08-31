[pantoken](../../../../index.md) / [packages/core/src](../index.md) / defineToken

# Function: defineToken()

> **defineToken**(`input`): [`Token`](../interfaces/Token.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

بناء [Token](../interfaces/Token.md) مشكل بالكامل من إدخال جزئي، الافتراضي `inherits` و`syntax`.

## Parameters

### input

[`TokenInput`](../interfaces/TokenInput.md)

## Returns

[`Token`](../interfaces/Token.md)

## Examples

**شم بناء الجملة من قيمة ملموسة**

```ts
import { defineToken } from "@pantoken/core";

defineToken({ name: "--instui-color-x", value: "#0374B5" });
// → { name: "--instui-color-x", syntax: "<color>", inherits: true, value: "#0374B5" }
```

**قيمة var() واحدة تسجل refersTo؛ light-dark() يعين المظهر**

```ts
import { defineToken } from "@pantoken/core";

defineToken({ name: "--instui-brand", value: "var(--instui-color-background-brand)" });
// → syntax "*", refersTo: "--instui-color-background-brand"

defineToken({ name: "--instui-bg", value: "light-dark(#fff, #000)" });
// → syntax "*", themed: true
```
