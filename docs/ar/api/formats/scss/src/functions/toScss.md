[pantoken](../../../../index.md) / [formats/scss/src](../index.md) / toScss

# Function: toScss()

> **toScss**(`tokens`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

إصدار متغيرات SCSS لـ IR الرمز.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR (على سبيل المثال من `@pantoken/tokens`).

### options?

[`ToScssOptions`](../interfaces/ToScssOptions.md) = `{}`

[ToScssOptions](../interfaces/ToScssOptions.md).

## Returns

`string`

سلسلة مصدر SCSS.

## Examples

**إصدار المتغيرات الافتراضية (الفاتحة)**

```ts
import { toScss } from "@pantoken/scss";
import { tokens } from "@pantoken/tokens";

toScss(tokens); // "$instui-color-brand: #0374b5;\n…"
```

**حل الوضع الداكن لمظهر آخر**

```ts
import { toScss } from "@pantoken/scss";
import { byTheme } from "@pantoken/tokens";

toScss(byTheme("canvas"), { mode: "dark" });
```
