[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / extendPlugin

# دالة: extendPlugin()

> **extendPlugin**(`base`, `overrides`): [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

بناء مكوّن إضافي فوق آخر. تُركَّب خطافات نفس المرحلة: `tokens` يشغّل `base` ثم
`overrides` (الذي يرى مخرجات الأساس)؛ `css` يدمج كلا `CssContribution`s؛ `icons`/`native` تشغّلان
كلاهما؛ `rehype` يربط المحللات (يتجاوز الأول). القدرات هي الاتحاد.

## المعلمات

### base

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

الإضافة المراد توسيعها.

### overrides

`Partial`\<[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)\>

خطافات (و `name` اختياري) مضافة فوقها.

## القيم المرجعة

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

مكوّن إضافي جديد ذو علامة تجارية.

## مثال

**أضف مساهمة CSS إضافية فوق مكوّن إضافي أساسي**

```ts
import { definePlugin, extendPlugin } from "@pantoken/plugin-kit";

const base = definePlugin({ name: "brand", css: () => ({ append: ":root {}" }) });
const themed = extendPlugin(base, { css: () => ({ append: ".dark {}" }) });
// themed.css merges both contributions; its append holds ":root {}\n\n.dark {}"
```
