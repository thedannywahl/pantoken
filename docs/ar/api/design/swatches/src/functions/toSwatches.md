[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSwatches

# Function: toSwatches()

> **toSwatches**(`tokens`, `mode?`): [`Swatch`](../interfaces/Swatch.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

تقليل IR token إلى قائمة مسطحة من عينات الألوان: حل المراجع، اختر وضعاً، احتفظ فقط
بالرموز التي تكون قيمتها لون hex (يتم حذف الرموز والرموز غير الملونة).

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR (على سبيل المثال من `@pantoken/tokens`).

### mode?

[`Mode`](../type-aliases/Mode.md) = `"light"`

أي وضع ألوان سيتم تحديده (الافتراضي `"light"`).

## Returns

[`Swatch`](../interfaces/Swatch.md)[]

قائمة العينات، المسماة حسب الرمز (بدون بادئة `--instui-`).

## Examples

**تقليل رمز IR إلى عينات الوضع الفاتح**

```ts
import { toSwatches } from "@pantoken/swatches";
import { tokens } from "@pantoken/tokens";

const swatches = toSwatches(tokens); // [{ name: "color-background-brand", hex: "#…" }, …]
```

**الوضع الداكن**

```ts
import { toSwatches } from "@pantoken/swatches";
import { byTheme } from "@pantoken/tokens";

const swatches = toSwatches(byTheme("canvas"), "dark");
```
