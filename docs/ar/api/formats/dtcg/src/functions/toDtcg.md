[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / toDtcg

# دالة: toDtcg()

> **toDtcg**(`tokens`, `mode?`): `Record`\<`string`, [`DtcgNode`](../type-aliases/DtcgNode.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

تحويل قائمة رموز IR إلى مستند DTCG.

## المعلمات

### tokens

للقراءة فقط [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

الـ IR (على سبيل المثال من `@pantoken/tokens`).

### mode?

[`Mode`](../type-aliases/Mode.md) = `"light"`

أي وضع لون يتم حله (الافتراضي `"light"`).

## القيم المرجعة

`Record`\<`string`, [`DtcgNode`](../type-aliases/DtcgNode.md)\>

شجرة رموز DTCG متداخلة.

## أمثلة

**تحويل IR الافتراضي إلى شجرة DTCG**

```ts
import { toDtcg } from "@pantoken/dtcg";
import { tokens } from "@pantoken/tokens";

const doc = toDtcg(tokens);
// doc.color.background.brand === { $value: "#0374b5", $type: "color" }
```

**حل الوضع الداكن لمظهر آخر**

```ts
import { toDtcg } from "@pantoken/dtcg";
import { byTheme } from "@pantoken/tokens";

toDtcg(byTheme("canvas"), "dark");
```
