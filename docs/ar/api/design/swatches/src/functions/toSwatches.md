[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSwatches

# دالة: toSwatches()

> **toSwatches**(`tokens`, `mode?`): [`Swatch`](../interfaces/Swatch.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

اختزِل IR التوكن إلى قائمة مسطحة من رقائق الألوان: حل المراجع، اختر وضعًا، احتفظ فقط
بالتوكنات التي قيمتها لون هكس (تُستبعد الأيقونات والتوكنات غير اللونية).

## المعلمات

### tokens

للقراءة فقط [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

الـ IR (مثلاً من `@pantoken/tokens`).

### mode?

[`Mode`](../type-aliases/Mode.md) = `"light"`

أي وضع لوني سيتم حله (الافتراضي `"light"`).

## القيم المرجعة

[`Swatch`](../interfaces/Swatch.md)[]

قائمة الرقائق، مسماة حسب التوكن (بدون البادئة `--instui-`).

## أمثلة

**اختزل IR التوكن إلى رقائق الوضع الفاتح**

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
