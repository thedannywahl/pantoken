[pantoken](../../../../index.md) / [platforms/vanilla/src](../index.md) / toVanillaVariables

# دالة: toVanillaVariables()

> **toVanillaVariables**(`tokens`, `options?`): `Record`\<`string`, `unknown`\>

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

حوّل قائمة رموز IR إلى كائن Vanilla Foundation `variables.json`.

## المعلمات

### tokens

للقراءة فقط [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

الـ IR (على سبيل المثال من `@pantoken/tokens`).

### options?

[`ToVanillaOptions`](../interfaces/ToVanillaOptions.md) = `{}`

[ToVanillaOptions](../interfaces/ToVanillaOptions.md).

## القيم المرجعة

`Record`\<`string`, `unknown`\>

كائن المتغيرات المتداخل لإرساله (PUT) إلى أصل `variables.json` الخاص بالسمة.

## أمثلة

**تحويل IR إلى كائن المتغيرات المتداخل**

```ts
import { toVanillaVariables } from "@pantoken/vanilla";
import { byTheme } from "@pantoken/tokens";

const vars = toVanillaVariables(byTheme("rebrand"));
// { global: { mainColors: { primary: "#…" }, … }, titleBar: { … }, button: { … } }
```

**الوضع الداكن**

```ts
import { toVanillaVariables } from "@pantoken/vanilla";
import { byTheme } from "@pantoken/tokens";

const vars = toVanillaVariables(byTheme("canvas"), { mode: "dark" });
```
