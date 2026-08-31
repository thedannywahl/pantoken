[pantoken](../../../../index.md) / [platforms/vanilla/src](../index.md) / toVanillaVariables

# Function: toVanillaVariables()

> **toVanillaVariables**(`tokens`, `options?`): `Record`\<`string`, `unknown`>>>>\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

تحويل قائمة رموز IR إلى كائن Vanilla Foundation `variables.json`.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR (على سبيل المثال من `@pantoken/tokens`).

### options?

[`ToVanillaOptions`](../interfaces/ToVanillaOptions.md) = `{}`

[ToVanillaOptions](../interfaces/ToVanillaOptions.md).

## Returns

`Record`\<`string`, `unknown`\>

كائن المتغيرات المتداخلة المراد PUT إلى أصل الموضوع `variables.json`.

## Examples

**تحويل IR إلى كائن المتغيرات المتداخلة**

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
