[pantoken](../../../../index.md) / [packages/model/src](../index.md) / defineToken

# Function: defineToken()

> **defineToken**(`input`): [`Token`](../interfaces/Token.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

بناء [Token](../interfaces/Token.md) بشكل صحيح من إدخال جزئي، مع تعيين الافتراضي `syntax` إلى `"*"` و
`inherits` إلى `true`. تستورد الإضافات هذا من `@pantoken/model` لتجنب الاعتماد على
`@pantoken/core`؛ للاستدلال الذكي على بناء جملة CSS استخدم `defineToken` من `@pantoken/core`.

## Parameters

### input

[`TokenInput`](../interfaces/TokenInput.md)

## Returns

[`Token`](../interfaces/Token.md)

## Example

```ts
import { defineToken } from "@pantoken/model";

defineToken({ name: "--instui-brand", value: "#0374B5" });
// → { name: "--instui-brand", syntax: "*", inherits: true, value: "#0374B5" }
```
