[pantoken](../../../../index.md) / [packages/core/src](../index.md) / resolveReferences

# Function: resolveReferences()

> **resolveReferences**(`tokens`, `mode?`): `Map`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

حل كل توكن إلى قيمة ملموسة وحيدة الوضع: توسيع `var(...)` السلاسل وانهيار
`light-dark()` إلى `mode` المختار.

## Parameters

### tokens

readonly [`Token`](../interfaces/Token.md)[]

IR.

### mode?

[`Mode`](../type-aliases/Mode.md) = `"light"`

أي جانب من `light-dark()` للاحتفاظ به (افتراضي `"light"`).

## Returns

`Map`\<`string`, `string`\>

خريطة اسم التوكن إلى قيمة ملموسة.

## Example

**حل IR المبني إلى قيم وضع مظلم ملموسة**

```ts
import { buildTokens, resolveReferences } from "@pantoken/core";

const resolved = resolveReferences(buildTokens(), "dark");
resolved.get("--instui-color-background-base"); // → a concrete "#…" value
```
