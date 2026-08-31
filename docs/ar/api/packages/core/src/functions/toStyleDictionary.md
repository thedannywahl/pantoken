[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toStyleDictionary

# Function: toStyleDictionary()

> **toStyleDictionary**(`tokens`, `mode?`): `Record`\<`string`, [`SdLeaf`](../interfaces/SdLeaf.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

شكّل IR المحل كقاموس توكن Style Dictionary مسطح مفتاح حسب اسم التوكن (مع البادئة `--` المحررة). اطعمه إلى `tools/sd-config` للمنبعثات الأصلية.

## Parameters

### tokens

readonly [`Token`](../interfaces/Token.md)[]

IR.

### mode?

[`Mode`](../type-aliases/Mode.md) = `"light"`

أي وضع ألوان سيتم تحديده (الافتراضي `"light"`).

## Returns

`Record`\<`string`, [`SdLeaf`](../interfaces/SdLeaf.md)\>

كائن قاموس Style Dictionary.

## Example

**شكّل IR للنسب الأصلية**

```ts
import { buildTokens, toStyleDictionary } from "@pantoken/core";

const dictionary = toStyleDictionary(buildTokens(), "light");
// → { "instui-color-background-base": { value: "#…", type: "color" }, … }
// keys drop the leading "--"; feed this to tools/sd-config.
```
