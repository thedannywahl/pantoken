[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toStyleDictionary

# دالة: toStyleDictionary()

> **toStyleDictionary**(`tokens`, `mode?`): `Record`\<`string`, [`SdLeaf`](../interfaces/SdLeaf.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

شكل الـ IR المحلّل كقاموس مسطح لرموز Style Dictionary مفهرس باسم الرمز (مع
إزالة `--` البادئة). قدّم هذا إلى `tools/sd-config` للمصدِّرين الأصليين.

## المعلمات

### tokens

للقراءة فقط [`Token`](../interfaces/Token.md)[]

الـ IR.

### mode?

[`Mode`](../type-aliases/Mode.md) = `"light"`

وضع اللون الذي سيتم حله (الافتراضي `"light"`).

## القيم المرجعة

`Record`\<`string`, [`SdLeaf`](../interfaces/SdLeaf.md)\>

كائن قاموس لـ Style Dictionary.

## مثال

**شكل الـ IR للسلالة الأصلية**

```ts
import { buildTokens, toStyleDictionary } from "@pantoken/core";

const dictionary = toStyleDictionary(buildTokens(), "light");
// → { "instui-color-background-base": { value: "#…", type: "color" }, … }
// keys drop the leading "--"; feed this to tools/sd-config.
```
