[pantoken](../../../../index.md) / [packages/core/src](../index.md) / resolveReferences

# دالة: resolveReferences()

> **resolveReferences**(`tokens`, `mode?`): `Map`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

حلّ كل توكن إلى قيمة ملموسة في وضع واحد: وسّع `var(...)` chains واطوِ
`light-dark()` إلى `mode` المختار.

## المعلمات

### tokens

للقراءة فقط [`Token`](../interfaces/Token.md)[]

الـ IR.

### mode?

[`Mode`](../type-aliases/Mode.md) = `"light"`

أي جانب من `light-dark()` يجب الاحتفاظ به (الافتراضي `"light"`).

## القيم المرجعة

`Map`\<`string`, `string`\>

خريطة من اسم التوكن إلى القيمة الملموسة.

## مثال

**حلّ الـ IR المبني إلى قيم داكنة ملموسة**

```ts
import { buildTokens, resolveReferences } from "@pantoken/core";

const resolved = resolveReferences(buildTokens(), "dark");
resolved.get("--instui-color-background-base"); // → a concrete "#…" value
```
