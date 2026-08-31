[pantoken](../../../../index.md) / [formats/stylus/src](../index.md) / toStylus

# Function: toStylus()

> **toStylus**(`tokens`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

إصدار متغيرات Stylus لـ IR الرمز.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR (على سبيل المثال من `@pantoken/tokens`).

### options?

[`ToStylusOptions`](../interfaces/ToStylusOptions.md) = `{}`

[ToStylusOptions](../interfaces/ToStylusOptions.md).

## Returns

`string`

سلسلة مصدر Stylus.

## Examples

**إصدار المتغيرات الافتراضية (الفاتحة)**

```ts
import { toStylus } from "@pantoken/stylus";
import { tokens } from "@pantoken/tokens";

toStylus(tokens); // "instui-color-brand = #0374b5\n…"
```

**حل الوضع الداكن لمظهر آخر**

```ts
import { toStylus } from "@pantoken/stylus";
import { byTheme } from "@pantoken/tokens";

toStylus(byTheme("canvas"), { mode: "dark" });
```
