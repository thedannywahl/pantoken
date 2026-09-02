[pantoken](../../../../index.md) / [packages/model/src](../index.md) / defineToken

# دالة: defineToken()

> **defineToken**(`input`): [`Token`](../interfaces/Token.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

بناء [Token](../interfaces/Token.md) مُشكّل بشكل صحيح من مدخلات جزئية، مع افتراض `syntax` إلى `"*"` و
`inherits` إلى `true`. تقوم الإضافات باستيراد هذا من `@pantoken/model` لتجنّب الاعتماد على
`@pantoken/core`; للاستخلاص الذكي لصياغة CSS استخدم `defineToken` من `@pantoken/core`.

## المعلمات

### input

[`TokenInput`](../interfaces/TokenInput.md)

## القيم المرجعة

[`Token`](../interfaces/Token.md)

## مثال

```ts
import { defineToken } from "@pantoken/model";

defineToken({ name: "--instui-brand", value: "#0374B5" });
// → { name: "--instui-brand", syntax: "*", inherits: true, value: "#0374B5" }
```
